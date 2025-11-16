<template>
  <div class="debug-layout">
    <header class="bg-blue-500 text-white p-4">
      <h1>Debug Layout</h1>
    </header>
    <main class="p-4">
      <slot />
    </main>
    <footer class="bg-gray-200 p-4">
      <p>Debug Footer</p>
    </footer>
  </div>
</template>