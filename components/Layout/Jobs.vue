<template>
  <div class="layout-jobs">
    <div class="jobs-pending">
      <div class="jobs-section">
        <h3 class="section-title">
          🚦 Pending Jobs
        </h3>
      </div>
    </div>

    <div class="jobs-recent">
      <div class="jobs-section">
        <h3 class="section-title">
          👍 Jobs Done
        </h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout-jobs {
  @apply p-3 shadow h-screen flex flex-col;
  width: 200px;

  .jobs-pending {
    @apply flex-1 border-b border-gray-300 mb-3;
  }

  .jobs-recent {
    height: 250px;
  }

  .job-section {
    @apply mb-5;
  }

  .section-title {
    @apply font-bold;
  }
}
</style>
