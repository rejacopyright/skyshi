export const mockOptions = [
  { value: 'very-high', label: 'Very High', color: 'danger' },
  { value: 'high', label: 'High', color: 'warning' },
  { value: 'normal', label: 'Medium', color: 'success' },
  { value: 'low', label: 'Low', color: 'primary' },
  { value: 'very-low', label: 'Very Low', color: 'info' },
]
export const mockOrder = [
  {
    value: 'terbaru',
    key: 'id',
    label: 'Terbaru',
    dir: 'desc',
    icon: 'sort-amount-down',
    cypress: 'sort-latest',
  },
  {
    value: 'terlama',
    key: 'id',
    label: 'Terlama',
    dir: 'asc',
    icon: 'sort-amount-up-alt',
    cypress: 'sort-oldest',
  },
  { value: 'a', key: 'title', label: 'A-Z', dir: 'asc', icon: 'sort-alpha-up', cypress: 'sort-az' },
  {
    value: 'z',
    key: 'title',
    label: 'Z-A',
    dir: 'desc',
    icon: 'sort-alpha-up-alt',
    cypress: 'sort-za',
  },
  {
    value: 'aktif',
    key: 'is_active',
    label: 'Belum Selesai',
    dir: 'desc',
    icon: 'check-square',
    cypress: 'sort-unfinished',
  },
]
