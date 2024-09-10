<template>
  <div class="p-6 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>
    <div class="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              User ID
            </th>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Item ID
            </th>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Quantity Borrowed
            </th>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Borrowed At
            </th>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Returned At
            </th>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="py-4 px-6 text-sm text-gray-800">{{ transaction.id }}</td>
            <td class="py-4 px-6 text-sm text-gray-800">{{ transaction.userId }}</td>
            <td class="py-4 px-6 text-sm text-gray-800">{{ transaction.itemId }}</td>
            <td class="py-4 px-6 text-sm text-gray-800">{{ transaction.quantityBorrowed }}</td>
            <td class="py-4 px-6 text-sm text-gray-800">{{ transaction.borrowedAt }}</td>
            <td class="py-4 px-6 text-sm text-gray-800">{{ transaction.returnedAt || 'N/A' }}</td>
            <td class="py-4 px-6 text-sm text-gray-800">{{ transaction.status }}</td>
            <td class="py-4 px-6 text-sm flex space-x-2">
              <button
                @click="editTransaction(transaction.id)"
                class="text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                Edit
              </button>
              <button
                @click="deleteTransaction(transaction.id)"
                class="text-red-600 hover:text-red-800 focus:outline-none"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTransactions',
  data() {
    return {
      transactions: [
        {
          id: 1,
          userId: 1,
          itemId: 1,
          quantityBorrowed: 1,
          borrowedAt: '2024-09-10 01:56:47.592',
          returnedAt: null,
          status: 'BORROWED'
        },
        {
          id: 2,
          userId: 2,
          itemId: 2,
          quantityBorrowed: 2,
          borrowedAt: '2024-09-10 01:56:47.596',
          returnedAt: null,
          status: 'PENDING'
        },
        {
          id: 3,
          userId: 3,
          itemId: 3,
          quantityBorrowed: 3,
          borrowedAt: '2024-09-09 10:00:00.000',
          returnedAt: '2024-09-10 15:30:00.000',
          status: 'RETURNED'
        },
        {
          id: 4,
          userId: 4,
          itemId: 4,
          quantityBorrowed: 1,
          borrowedAt: '2024-09-08 12:00:00.000',
          returnedAt: null,
          status: 'BORROWED'
        }
      ]
    }
  },
  methods: {
    editTransaction(id) {
      // Implement edit functionality here
      alert(`Edit transaction ${id}`)
    },
    deleteTransaction(id) {
      // Implement delete functionality here
      alert(`Delete transaction ${id}`)
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
