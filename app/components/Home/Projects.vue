<script setup lang="ts">
const { t } = useI18n()

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution built with Nuxt and Vue.js',
    tags: ['Vue.js', 'Nuxt', 'TypeScript'],
    image: 'i-lucide-shopping-cart',
    link: '#',
    github: '#'
  },
  {
    title: 'Dashboard Analytics',
    description: 'Real-time analytics dashboard with beautiful data visualizations',
    tags: ['Vue.js', 'TypeScript', 'Tailwind'],
    image: 'i-lucide-bar-chart',
    link: '#',
    github: '#'
  },
  {
    title: 'Social Media App',
    description: 'A social networking platform with real-time features',
    tags: ['Nuxt', 'Node.js', 'WebSocket'],
    image: 'i-lucide-users',
    link: '#',
    github: '#'
  }
]
</script>

<template>
  <section
    id="projects"
    class="py-20 bg-muted/30"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div
          v-motion-slide-visible-once-bottom
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            {{ t("projects.title") }}
          </h2>
          <p class="text-lg text-muted">
            {{ t("projects.subtitle") }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
            v-for="(project, index) in projects"
            :key="project.title"
            v-motion
            class="overflow-hidden hover:shadow-xl transition-shadow"
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{
              opacity: 1,
              x: 0,
              transition: {
                delay: index * 200,
                type: 'spring',
                stiffness: 100
              }
            }"
          >
            <template #header>
              <div class="p-8 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <UIcon
                  :name="project.image"
                  class="w-16 h-16 text-primary"
                />
              </div>
            </template>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">
                {{ project.title }}
              </h3>
              <p class="text-muted mb-4">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <UBadge
                  v-for="tag in project.tags"
                  :key="tag"
                  variant="subtle"
                  color="primary"
                >
                  {{ tag }}
                </UBadge>
              </div>
              <div class="flex gap-3">
                <UButton
                  :label="t('projects.view')"
                  variant="outline"
                  size="sm"
                  :to="project.link"
                  trailing-icon="i-lucide-external-link"
                />
                <UButton
                  :label="t('projects.code')"
                  variant="ghost"
                  size="sm"
                  :to="project.github"
                  icon="i-simple-icons-github"
                />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
