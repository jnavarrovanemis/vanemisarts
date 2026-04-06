# Esquema de Base de Datos: Vanemis Arts

## 1. Visión General
Esta base de datos relacional (PostgreSQL) está diseñada para soportar las operaciones de la agencia de marketing Vanemis Arts. La arquitectura permite gestionar prospectos, clientes, múltiples marcas por cliente, planes de contenido mensuales, y un flujo de distribución multi-plataforma con sistema de aprobación y auditoría.

* **Motor:** PostgreSQL (Supabase)
* **Características clave:** Tipado estricto (ENUMs), Auditoría transaccional, Seguridad a nivel de fila (RLS) y soporte Multi-idioma (i18n).

---

## 2. Tipos de Datos (ENUMs)
Se utilizan *System Keys* en formato `snake_case` para garantizar la integridad y facilitar la internacionalización en el frontend.

| Nombre | Valores | Descripción |
| :--- | :--- | :--- |
| `user_role` | `admin`, `employee`, `client` | Nivel de acceso del usuario. |
| `lead_status` | `new`, `contacted`, `qualified`, `converted`, `lost` | Etapa del prospecto en el CRM interno. |
| `project_stage_type` | `idea`, `in_development`, `launched`, `scaling` | Madurez del proyecto del prospecto. |
| `content_status` | `pending`, `in_progress`, `waiting_approval`, `approved` | Estado de producción de la pieza matriz. |
| `distribution_status`| `pending`, `scheduled`, `published`, `failed`, `cancelled`| Estado de publicación por red social. |
| `social_platform` | `facebook`, `instagram`, `tiktok`, `youtube`, `x`, `linkedin`, `spotify` | Redes de destino. |
| `content_format` | `reel`, `carousel`, `video`, `podcast`, `post`, `story` | Formato multimedia. |

---

## 3. Diccionario de Tablas

### Módulo: Autenticación y Comercial

#### `profiles`
Extensión de `auth.users` de Supabase para manejo de roles y datos públicos.
* `id` (UUID, PK) - Referencia a auth.users
* `full_name` (TEXT)
* `email` (TEXT, UNIQUE)
* `role` (user_role) - Default: 'client'
* `created_at` (TIMESTAMPTZ)

#### `leads`
Registro de prospectos capturados vía web.
* `id` (UUID, PK)
* `name` (TEXT)
* `email` (TEXT)
* `phone` (TEXT, Nullable)
* `project_stage` (project_stage_type)
* `service_interest` (TEXT)
* `website_instagram` (TEXT, Nullable)
* `project_description` (TEXT, Nullable)
* `internal_status` (lead_status) - Default: 'new'

#### `service_packages`
Catálogo de paquetes de marketing de la agencia.
* `id` (UUID, PK)
* `name` (TEXT)
* `max_posts` (INTEGER)
* `max_videos` (INTEGER)
* `price` (NUMERIC)
* `is_active` (BOOLEAN)

---

### Módulo: Clientes y Organización

#### `brands`
Marcas o empresas asociadas a un cliente (Relación 1 a N).
* `id` (UUID, PK)
* `client_id` (UUID, FK -> profiles.id)
* `name` (TEXT)
* `industry` (TEXT)
* `logo_url` (TEXT)

#### `brand_subscriptions`
Control de cuotas y vinculación entre una marca y un paquete contratado.
* `id` (UUID, PK)
* `brand_id` (UUID, FK -> brands.id)
* `package_id` (UUID, FK -> service_packages.id)
* `starts_at` (DATE)
* `ends_at` (DATE, Nullable)
* `is_active` (BOOLEAN)

#### `content_plans`
Agrupador lógico mensual del trabajo para una marca.
* `id` (UUID, PK)
* `brand_id` (UUID, FK -> brands.id)
* `month` (INTEGER)
* `year` (INTEGER)
* **Restricción:** `UNIQUE(brand_id, month, year)`

---

### Módulo: Producción y Auditoría

#### `content_items`
La pieza maestra de contenido antes de su distribución.
* `id` (UUID, PK)
* `plan_id` (UUID, FK -> content_plans.id)
* `assigned_employee_id` (UUID, FK -> profiles.id)
* `format` (content_format)
* `title` (TEXT)
* `description` (TEXT)
* `media_url` (TEXT)
* `status` (content_status)
* `notes_employee` (TEXT)
* `notes_client` (TEXT)

#### `content_distribution`
Relación entre la pieza maestra y las redes donde se publicará.
* `id` (UUID, PK)
* `content_item_id` (UUID, FK -> content_items.id)
* `platform` (social_platform)
* `status` (distribution_status)
* `scheduled_date` (TIMESTAMPTZ)
* `specific_link` (TEXT)
* **Restricción:** `UNIQUE(content_item_id, platform)`

#### `content_status_history`
Auditoría inmutable de cambios en el flujo de aprobación.
* `id` (UUID, PK)
* `content_item_id` (UUID, FK -> content_items.id)
* `changed_by_id` (UUID, FK -> profiles.id)
* `old_status` (content_status, Nullable)
* `new_status` (content_status)
* `comment` (TEXT, Nullable)

#### `notifications`
Sistema de alertas dinámicas.
* `id` (UUID, PK)
* `user_id` (UUID, FK -> profiles.id)
* `actor_id` (UUID, FK -> profiles.id)
* `title_key` (TEXT) - Clave i18n
* `message_key` (TEXT) - Clave i18n
* `params` (JSONB) - Variables para i18n
* `entity_type` (TEXT)
* `entity_id` (UUID)
* `is_read` (BOOLEAN)

---

## 4. Lógica de Negocio (RPC)
Funciones ejecutadas directamente en PostgreSQL (`SECURITY DEFINER`, `search_path = public`).

1.  **`change_content_status(p_item_id, p_new_status, p_comment)`**: Transacción que actualiza el estado de un ítem y genera el registro en el historial.
2.  **`update_client_notes(p_item_id, p_notes)`**: Expone una vía segura para que los clientes modifiquen exclusivamente sus notas, verificando propiedad en cascada.
3.  **`check_quota(p_brand_id, p_plan_id, p_format)`**: Valida si la marca tiene espacio en su cuota mensual contratada antes de permitir la creación de nuevo contenido.

---

## 5. Seguridad (RLS)
El control de acceso obligatorio se gestiona en base de datos.
* **Administradores:** Acceso total (`ALL`) verificado mediante el rol en `profiles`.
* **Empleados:** Acceso a todas las marcas, pero edición limitada a los `content_items` que tienen asignados.
* **Clientes:** * Pueden hacer `SELECT` de datos vinculados estrictamente a su `auth.uid()`.
    * Permiso de `UPDATE` revocado en la tabla principal de contenidos, forzando el uso de la RPC `update_client_notes` para interactuar.