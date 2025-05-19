<template>
  <div class="dropdown" v-click-outside="close">
    <button class="dropdown-trigger" @click="toggle">
      <IconMore />
    </button>
    <div v-if="open" class="dropdown-menu">
      <ul>
        <li @click="onEdit">
          <IconEdit />
          <span class="label">Editar</span>
        </li>
        <li @click="onRemove">
          <IconTrash />
          <span class="label">Remover</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconMore from '../icons/IconMore.vue'
import IconEdit from '../icons/IconEdit.vue'
import IconTrash from '../icons/IconTrash.vue'

const open = ref(false)

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'remove'): void
}>()

function toggle(): void {
  open.value = !open.value
}
function close(): void {
  open.value = false
}
function onEdit(): void {
  close()
  emit('edit')
}
function onRemove(): void {
  close()
  emit('remove')
}
</script>

<style scoped lang="scss">
.dropdown-trigger {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-items: center;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: -5px;
  min-width: 180px;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(44, 44, 44, 0.08);
  border: 1px solid #f0f0f0;
  z-index: 100;
  padding: 8px 0;
}
.dropdown-menu::after {
  content: '';
  position: absolute;
  top: -8px;
  right: 14px;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 5px 10px 5px;
  border-color: transparent transparent var(--color-white) transparent;
  transform: rotate(0deg);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  cursor: pointer;
  color: #6c4ed9;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.15s;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background: #f7f5ff;
}
.icon {
  display: flex;
  align-items: center;
}
.label {
  font-weight: 400;
}
</style>
