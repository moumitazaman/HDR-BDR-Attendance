import { defineStore } from 'pinia'

export const useRecordStore = defineStore('recordStore', {
  state: () => ({
    records: [] as any[]
  }),
  actions: {
    addRecord(record: any) {
      this.records.push(record)
      localStorage.setItem('records', JSON.stringify(this.records))
    },
    loadRecords() {
      const stored = localStorage.getItem('records')
      this.records = stored ? JSON.parse(stored) : []
    }
  }
})
