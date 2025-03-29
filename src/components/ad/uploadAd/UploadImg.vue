<script setup>
import { ref } from "vue";

const inputValues = defineModel('inputValues')
const previeImages = defineModel('previeImages')
const dragActive = ref(false);
const errorMessage = ref("");

// Максимальный размер файла в байтах (например, 10 МБ)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Проверка файла на тип и размер
const validateFile = (file) => {
  if (!file.type.startsWith("image/")) {
    errorMessage.value = "Можно загружать только изображения.";
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    errorMessage.value = `Размер файла не должен превышать 10 МБ.`;
    return false;
  }
  return true;
};

// Выбор изображений вручную
const selectImages = () => {
  document.querySelector('input[type="file"]').click();
};

// Обработка изменений файла
const handleFileChange = (event, index) => {
  const file = event.target.files[0];
  if (file && validateFile(file)) {
    inputValues.value[index] = file;
    previeImages.value[index] = file
    const reader = new FileReader();
    reader.onload = () => {
      previeImages.value[index] = reader.result;
      errorMessage.value = ""; // Очистить ошибки
    };
    reader.readAsDataURL(file);
  }
};

// Удаление изображения
const removeImage = (index) => {
  inputValues.value[index] = null;
  previeImages.value[index] = null;
};

// Обработка перетаскивания
const onDragOver = () => {
  dragActive.value = true;
};

// Уход мыши с области
const onDragLeave = () => {
  dragActive.value = false;
};

// Обработка drop события
const onDrop = (event) => {
  dragActive.value = false;
  const files = event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const emptyIndex = inputValues.value.findIndex((img) => img === null);
    if (emptyIndex === -1) {
      errorMessage.value = "Все ячейки заняты. Удалите изображение, чтобы добавить новое.";
      break;
    }
    if (validateFile(file)) {
      inputValues.value[emptyIndex] = file;
      const reader = new FileReader();
      reader.onload = () => {
        previeImages.value[emptyIndex] = reader.result
        errorMessage.value = ""; // Очистить ошибки
      };
      reader.readAsDataURL(file);
    }
  }
};

// Обработка вставки из буфера обмена
const onPaste = (event) => {
  const items = event.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      const emptyIndex = inputValues.value.findIndex((img) => img === null);
      if (emptyIndex === -1) {
        errorMessage.value = "Все ячейки заняты. Удалите изображение, чтобы добавить новое.";
        break;
      }
      if (validateFile(file)) {
        inputValues.value[emptyIndex] = file;
        const reader = new FileReader();
        reader.onload = () => {
          previeImages.value[emptyIndex] = reader.result
          errorMessage.value = ""; // Очистить ошибки
        };
        reader.readAsDataURL(file);
      }
    }
  }
};

</script>

<template>
  <div
    class="space-y-2"
    @paste="onPaste"
  >
    <p class="text-sm text-text-custom max-lg:hidden">
      Перетащите фото сюда, вставьте из буфера обмена или
      <span class="text-text-custom underline cursor-pointer" @click="selectImages">
        выберите их на своем компьютере...
      </span>
    </p>
    <p class="text-sm lg:hidden">
      <span class="text-gray-100 underline cursor-pointer" @click="selectImages">
        Выберите фото
      </span>
    </p>
    <div
      class="grid grid-cols-4 gap-4 border-2 border-dashed border-gray-300 rounded p-4"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      :class="dragActive ? 'border-blue-500 bg-blue-50' : ''"
    >
      <div
        v-for="(image, index) in previeImages"
        :key="index"
        class="relative flex items-center justify-center w-20 h-20 max-[480px]:w-14 max-[480px]:h-14 max-[360px]:h-10 max-[360px]:w-10 bg-gray-200 rounded border border-gray-300"
      >
        <img v-if="image" :src="image" alt="Preview" class="object-cover w-full h-full rounded" />
        <button
          v-if="image"
          @click="removeImage(index)"
          class="absolute top-1 text-black right-1 bg-white rounded-full px-1.5 duration-200 hover:bg-green-300 active:bg-green-400 cursor-pointer shadow-md"
        >
          ✕
        </button>
        <label
          v-else
          class="flex px-3 py-4 flex-col items-center justify-center text-gray-500 cursor-pointer"
        >
          <input
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleFileChange($event, index)"
          />
          <span class="text-xl">📷</span>
          <span class="text-sm max-[480px]:hidden">Добавить</span>
        </label>
      </div>
    </div>
    <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
    <span class="text-text-custom text-xs">Первое фото будет отображаться в результатах поиска, выберите наиболее удачное.</span>
  </div>
</template>