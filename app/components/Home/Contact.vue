<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { t } = useI18n()
const toast = useToast()

const ContactSchema = z.object({
  name: z.string().min(2, t('contact.form.errors.name')),
  email: z.string().email(t('contact.form.errors.email')),
  interest: z.object({
    label: z.string(),
    value: z.string()
  }).optional(),
  message: z.string().min(10, t('contact.form.errors.message'))
})

// Nombre distinto al schema para evitar conflicto de tipos
type ContactForm = z.output<typeof ContactSchema>

const INITIAL_STATE = {
  name: '',
  email: '',
  interest: undefined as { label: string, value: string } | undefined,
  message: ''
}

const state = reactive({ ...INITIAL_STATE })
const loading = ref(false)
const success = ref(false)

const interestOptions = computed(() => [
  { label: t('contact.form.interests.community'), value: 'Community Management' },
  { label: t('contact.form.interests.video'), value: 'Edición de Video' },
  { label: t('contact.form.interests.strategy'), value: 'Estrategia' },
  { label: t('contact.form.interests.other'), value: 'Otro' }
])

const extractErrorMessage = (err: unknown): string => {
  if (!err || typeof err !== 'object') return t('contact.form.errors.generic')
  const e = err as Record<string, unknown>

  if (e.data && typeof e.data === 'object') {
    const d = e.data as Record<string, unknown>
    if (d.data && typeof d.data === 'object') {
      const first = Object.values(d.data as Record<string, string[]>).flat()[0]
      if (first) return first
    }
    if (typeof d.statusMessage === 'string' && d.statusMessage) return d.statusMessage
  }

  if (typeof e.statusMessage === 'string' && e.statusMessage) return e.statusMessage
  if (typeof e.message === 'string' && !e.message.startsWith('[')) return e.message

  return t('contact.form.errors.generic')
}

const handleSubmit = async (event: FormSubmitEvent<ContactForm>) => {
  loading.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: event.data.name,
        email: event.data.email,
        message: event.data.message,
        interest: event.data.interest?.value
      }
    })

    success.value = true
    Object.assign(state, INITIAL_STATE)
  } catch (err: unknown) {
    toast.add({
      title: t('contact.form.errors.title'),
      description: extractErrorMessage(err),
      color: 'error',
      icon: 'i-heroicons-exclamation-circle',
      duration: 6000
    })
  } finally {
    loading.value = false
  }
}

const socialLinks = [
  {
    icon: 'i-simple-icons-instagram',
    url: 'https://www.instagram.com/vanemis_arts14/',
    label: 'Instagram'
  },
  {
    icon: 'i-simple-icons-facebook',
    url: 'https://www.facebook.com/share/1HhP8audD7/',
    label: 'Facebook'
  },
  {
    icon: 'i-simple-icons-whatsapp',
    url: 'https://wa.me/584248882878',
    label: 'WhatsApp'
  }
]
</script>

<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-gray-50 py-24 selection:bg-pink-500/30 dark:bg-gray-950"
  >
    <div class="container relative z-10 mx-auto px-4">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div
            v-motion-slide-visible-once-bottom
            class="space-y-8 lg:sticky lg:top-24"
          >
            <div>
              <span
                class="mb-6 inline-flex items-center gap-2 rounded-full
                       border border-green-500/20 bg-green-500/10
                       px-3 py-1 text-xs font-semibold tracking-wide
                       text-green-600 dark:text-green-400"
              >
                <span class="relative flex h-2 w-2">
                  <span
                    class="absolute inline-flex h-full w-full animate-ping
                           rounded-full bg-green-400 opacity-75"
                  />
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {{ t('contact.status') }}
              </span>
              <h2
                class="mb-6 text-4xl font-extrabold tracking-tight
                       text-gray-900 md:text-6xl dark:text-white"
              >
                {{ t('contact.title') }}
              </h2>
              <p class="max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {{ t('contact.subtitle') }}
              </p>
            </div>

            <div class="flex flex-wrap gap-4">
              <UButton
                v-for="social in socialLinks"
                :key="social.label"
                :to="social.url"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="ghost"
                class="flex h-12 w-12 items-center justify-center rounded-xl
                       border border-gray-200 bg-white shadow-sm
                       transition-all duration-300
                       hover:border-pink-500 hover:text-pink-500 hover:shadow-md
                       dark:border-gray-800 dark:bg-gray-900"
                :aria-label="social.label"
              >
                <UIcon
                  :name="social.icon"
                  class="h-6 w-6"
                />
              </UButton>
            </div>
          </div>

          <!-- Columna derecha: formulario -->
          <div
            v-motion-slide-visible-once-bottom
            :delay="200"
            class="relative"
          >
            <div
              class="absolute -inset-4 rounded-[2.5rem]
                     bg-linear-to-tr from-pink-500/20 to-purple-600/20
                     opacity-50 blur-2xl"
              aria-hidden="true"
            />

            <div
              class="relative rounded-4xl border border-gray-200 bg-white
                     p-8 shadow-2xl md:p-10 dark:border-gray-800 dark:bg-gray-900"
            >
              <!-- Estado de éxito -->
              <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div
                  v-if="success"
                  class="absolute inset-0 z-30 flex flex-col items-center justify-center
                         rounded-4xl bg-white p-8 text-center dark:bg-gray-900"
                >
                  <div
                    class="mb-6 flex h-20 w-20 items-center justify-center
                           rounded-full bg-green-100 text-green-500
                           dark:bg-green-500/10"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="h-12 w-12"
                    />
                  </div>
                  <h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {{ t('contact.success.title') }}
                  </h3>
                  <p class="mb-8 text-gray-600 dark:text-gray-400">
                    {{ t('contact.success.message') }}
                  </p>
                  <UButton
                    variant="soft"
                    color="primary"
                    size="lg"
                    :label="t('contact.success.button')"
                    @click="success = false"
                  />
                </div>
              </Transition>

              <!-- Formulario -->
              <UForm
                :schema="ContactSchema"
                :state="state"
                class="space-y-6"
                @submit="handleSubmit"
              >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <UFormField
                    name="name"
                    :label="t('contact.form.labels.name')"
                    class="col-span-1"
                  >
                    <UInput
                      v-model="state.name"
                      :placeholder="t('contact.form.placeholders.name')"
                      size="xl"
                      color="primary"
                      autocomplete="name"
                      class="w-full"
                    />
                  </UFormField>

                  <UFormField
                    name="email"
                    :label="t('contact.form.labels.email')"
                    class="col-span-1"
                  >
                    <UInput
                      v-model="state.email"
                      type="email"
                      placeholder="hola@empresa.com"
                      size="xl"
                      icon="i-heroicons-envelope"
                      color="primary"
                      autocomplete="email"
                      class="w-full"
                    />
                  </UFormField>

                  <UFormField
                    name="interest"
                    :label="t('contact.form.labels.interest')"
                    class="col-span-1 md:col-span-2"
                  >
                    <USelectMenu
                      v-model="state.interest"
                      :items="interestOptions"
                      :placeholder="t('contact.form.placeholders.select')"
                      size="xl"
                      color="primary"
                      class="w-full"
                    />
                  </UFormField>

                  <UFormField
                    name="message"
                    :label="t('contact.form.labels.message')"
                    class="col-span-1 md:col-span-2"
                  >
                    <UTextarea
                      v-model="state.message"
                      :placeholder="t('contact.form.placeholders.message')"
                      size="xl"
                      color="primary"
                      autoresize
                      :rows="5"
                      :maxrows="10"
                      variant="outline"
                      class="w-full"
                    />
                  </UFormField>
                </div>

                <UButton
                  type="submit"
                  block
                  size="xl"
                  :loading="loading"
                  :disabled="loading"
                  class="mt-2 h-16 rounded-2xl
                         bg-linear-to-r from-pink-500 via-purple-500 to-violet-600
                         text-xl font-bold text-white shadow-xl
                         transition-all duration-300
                         hover:-translate-y-0.5 hover:opacity-90 hover:shadow-pink-500/20
                         active:scale-98 disabled:opacity-60"
                >
                  {{ loading ? t('contact.form.sending') : t('contact.form.submit') }}
                  <template
                    v-if="!loading"
                    #trailing
                  >
                    <UIcon
                      name="i-heroicons-paper-airplane"
                      class="h-6 w-6 rotate-45"
                    />
                  </template>
                </UButton>
              </UForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
