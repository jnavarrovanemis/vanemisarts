<script setup lang="ts">
import { z } from 'zod'

const { t } = useI18n()
const toast = useToast()

const formRef = ref()
const currentStep = ref(1)

// Esquema Paso 1
const Step1Schema = computed(() =>
  z.object({
    name: z.string().min(2, t('contact.form.errors.name')),
    email: z.string().email(t('contact.form.errors.email')),
    phone: z.string()
      .regex(/^\+?[1-9]\d{6,14}$/, t('contact.form.errors.phone'))
      .optional()
      .or(z.literal(''))
  })
)

// Esquema Paso 2
const Step2Schema = computed(() =>
  z.object({
    projectStage: z.object(
      {
        label: z.string(),
        value: z.string()
      },
      { message: t('contact.form.errors.stage') }
    ),
    website: z.string().optional(),
    interest: z.object(
      {
        label: z.string(),
        value: z.string()
      },
      { message: t('contact.form.errors.interest') }
    ),
    project: z.string().optional()
  })
)

const activeSchema = computed(() =>
  currentStep.value === 1 ? Step1Schema.value : Step2Schema.value
)

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  projectStage: undefined as { label: string, value: string } | undefined,
  website: '',
  interest: undefined as { label: string, value: string } | undefined,
  project: ''
}

const state = reactive({ ...INITIAL_STATE })
const loading = ref(false)
const success = ref(false)

const stageOptions = computed(() => [
  { label: t('contact.form.stages.idea'), value: 'idea' },
  { label: t('contact.form.stages.starting'), value: 'starting' },
  { label: t('contact.form.stages.established'), value: 'established' }
])

const interestOptions = computed(() => [
  { label: t('contact.form.interests.web'), value: 'Web Development' },
  { label: t('contact.form.interests.community'), value: 'Community Management' },
  { label: t('contact.form.interests.branding'), value: 'Branding' },
  { label: t('contact.form.interests.strategy'), value: 'Strategy' },
  { label: t('contact.form.interests.video'), value: 'Video Editing' },
  { label: t('contact.form.interests.other'), value: 'Other' }
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

const nextStep = async () => {
  try {
    await formRef.value?.validate()
    currentStep.value = 2
  } catch {
    // Errores manejados automáticamente por Nuxt UI
  }
}

const prevStep = () => {
  currentStep.value = 1
}

const handleSubmit = async () => {
  loading.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: state.name,
        email: state.email,
        phone: state.phone,
        projectStage: state.projectStage?.value,
        website: state.website,
        interest: state.interest?.value,
        project: state.project
      }
    })

    success.value = true
    Object.assign(state, INITIAL_STATE)
    currentStep.value = 1
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
                class="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-green-600 backdrop-blur-sm dark:text-green-400"
              >
                <span class="relative flex h-2 w-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {{ t('contact.status') }}
              </span>
              <h2
                class="mb-6 text-balance text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-white"
              >
                {{ t('contact.title') }}
              </h2>
              <p class="max-w-md text-balance text-lg leading-relaxed text-gray-600 dark:text-gray-400">
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
                class="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-500 hover:shadow-lg hover:shadow-pink-500/20 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-pink-400"
                :aria-label="social.label"
              >
                <UIcon
                  :name="social.icon"
                  class="h-6 w-6"
                />
              </UButton>
            </div>
          </div>

          <div
            v-motion-slide-visible-once-bottom
            :delay="200"
            class="relative"
          >
            <div
              class="absolute -inset-4 rounded-[3rem] bg-linear-to-tr from-pink-500/30 to-purple-600/30 opacity-50 blur-3xl transition-opacity duration-500"
              aria-hidden="true"
            />

            <div
              class="relative flex min-h-[520px] flex-col justify-center rounded-4xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-white/10 dark:bg-gray-900/80"
            >
              <Transition
                name="fade"
                mode="out-in"
              >
                <div
                  v-if="success"
                  class="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-4xl bg-white/95 p-8 text-center backdrop-blur-md dark:bg-gray-900/95"
                >
                  <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500 shadow-inner shadow-green-500/20 dark:bg-green-500/10">
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
                    size="xl"
                    class="rounded-xl px-8"
                    :label="t('contact.success.button')"
                    @click="success = false"
                  />
                </div>

                <div
                  v-else
                  class="flex h-full flex-col"
                >
                  <div class="mb-8 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div
                        :class="[
                          'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500',
                          currentStep >= 1
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                        ]"
                      >
                        <UIcon
                          v-if="currentStep > 1"
                          name="i-heroicons-check"
                          class="h-5 w-5"
                        />
                        <span v-else>1</span>
                      </div>

                      <div class="relative h-1 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                        <div
                          class="absolute left-0 top-0 h-full bg-pink-500 transition-all duration-500 ease-out"
                          :class="currentStep === 2 ? 'w-full' : 'w-0'"
                        />
                      </div>

                      <div
                        :class="[
                          'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500',
                          currentStep === 2
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                        ]"
                      >
                        2
                      </div>
                    </div>
                    <span class="text-sm font-semibold tracking-wide text-pink-500 dark:text-pink-400">
                      {{ currentStep === 1 ? t('contact.form.steps.step1') : t('contact.form.steps.step2') }}
                    </span>
                  </div>

                  <UForm
                    ref="formRef"
                    :schema="activeSchema"
                    :state="state"
                    class="flex-1"
                    @submit="handleSubmit"
                  >
                    <Transition
                      name="slide-up"
                      mode="out-in"
                    >
                      <div
                        v-if="currentStep === 1"
                        class="space-y-6"
                      >
                        <UFormField
                          name="name"
                          :label="t('contact.form.labels.name')"
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
                        >
                          <UInput
                            v-model="state.email"
                            type="email"
                            :placeholder="t('contact.form.placeholders.email')"
                            size="xl"
                            icon="i-heroicons-envelope"
                            color="primary"
                            autocomplete="email"
                            class="w-full"
                          />
                        </UFormField>

                        <UFormField
                          name="phone"
                          :label="t('contact.form.labels.phone')"
                        >
                          <UInput
                            v-model="state.phone"
                            type="tel"
                            :placeholder="t('contact.form.placeholders.phone')"
                            size="xl"
                            icon="i-heroicons-phone"
                            color="primary"
                            autocomplete="tel"
                            class="w-full"
                          />
                        </UFormField>

                        <UButton
                          type="button"
                          block
                          size="xl"
                          class="mt-8 h-14 rounded-xl bg-gray-900 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-gray-900/30 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                          @click="nextStep"
                        >
                          {{ t('contact.form.buttons.next') }}
                          <template #trailing>
                            <UIcon
                              name="i-heroicons-arrow-right"
                              class="h-5 w-5"
                            />
                          </template>
                        </UButton>
                      </div>

                      <div
                        v-else-if="currentStep === 2"
                        class="space-y-6"
                      >
                        <UFormField
                          name="projectStage"
                          :label="t('contact.form.labels.projectStage')"
                        >
                          <USelectMenu
                            v-model="state.projectStage"
                            :items="stageOptions"
                            :placeholder="t('contact.form.placeholders.stageSelect')"
                            size="xl"
                            color="primary"
                            class="w-full"
                          />
                        </UFormField>

                        <UFormField
                          name="interest"
                          :label="t('contact.form.labels.interest')"
                        >
                          <USelectMenu
                            v-model="state.interest"
                            :items="interestOptions"
                            :placeholder="t('contact.form.placeholders.interestSelect')"
                            size="xl"
                            color="primary"
                            class="w-full"
                          />
                        </UFormField>

                        <UFormField
                          name="website"
                          :label="t('contact.form.labels.website')"
                        >
                          <UInput
                            v-model="state.website"
                            :placeholder="t('contact.form.placeholders.website')"
                            size="xl"
                            icon="i-heroicons-globe-alt"
                            color="primary"
                            class="w-full"
                          />
                        </UFormField>

                        <UFormField
                          name="project"
                          :label="t('contact.form.labels.project')"
                        >
                          <UTextarea
                            v-model="state.project"
                            :placeholder="t('contact.form.placeholders.project')"
                            size="xl"
                            color="primary"
                            autoresize
                            :rows="3"
                            :maxrows="6"
                            variant="outline"
                            class="w-full"
                          />
                        </UFormField>

                        <div class="mt-8 flex items-center gap-4">
                          <UButton
                            type="button"
                            variant="soft"
                            color="neutral"
                            size="xl"
                            class="h-14 rounded-xl px-6 transition-all hover:-translate-y-1"
                            :aria-label="t('contact.form.buttons.back')"
                            @click="prevStep"
                          >
                            <UIcon
                              name="i-heroicons-arrow-left"
                              class="h-5 w-5"
                            />
                          </UButton>

                          <UButton
                            type="submit"
                            block
                            size="xl"
                            :loading="loading"
                            :disabled="loading"
                            class="h-14 flex-1 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-violet-600 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:opacity-90 hover:shadow-pink-500/30 active:scale-[0.98] disabled:opacity-60"
                          >
                            {{ loading ? t('contact.form.buttons.sending') : t('contact.form.buttons.submit') }}
                            <template
                              v-if="!loading"
                              #trailing
                            >
                              <UIcon
                                name="i-heroicons-paper-airplane"
                                class="h-5 w-5 rotate-45"
                              />
                            </template>
                          </UButton>
                        </div>
                      </div>
                    </Transition>
                  </UForm>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Transiciones fluidas para cambiar entre pasos */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* Transición para el estado de éxito */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
