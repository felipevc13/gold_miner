<template>
  <div class="flex flex-col items-start p-3 gap-2.5 w-full bg-[#17171C] shadow-md rounded-lg">
    <!-- Header -->
    <div class="w-full flex flex-row items-center">
      <h3 class="text-[#DAD7DE] text-sm font-semibold leading-5">
        Busque por um mercado ou nicho
      </h3>
    </div>
    
    <!-- Search Input -->
    <div class="w-full">
      <div class="relative flex items-center w-full">
        <input
          type="text"
          :placeholder="placeholder"
          :value="modelValue"
          @input="handleInput"
          @keyup.enter="$emit('search', searchQuery)"
          class="w-full h-9 px-2.5 py-1.5 bg-[#292932] rounded text-[#DAD7DE] text-sm placeholder:text-[rgba(218,215,222,0.3)] focus:outline-none focus:ring-1 focus:ring-[#8E6CE4]"
        />
        <button
          v-if="modelValue"
          @click="clearSearch"
          class="absolute right-2 text-[#DAD7DE] hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Results Slot -->
    <div v-if="$slots.results" class="w-full">
      <slot name="results"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: "ex: 'saúde para idosos', 'produtividade'"
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const searchQuery = ref(props.modelValue)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  emit('update:modelValue', value)
  emit('search', value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue: string) => {
  if (newValue !== searchQuery.value) {
    searchQuery.value = newValue
  }
})
</script>
