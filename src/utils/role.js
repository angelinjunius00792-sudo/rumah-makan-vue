export const homeByRole = (role) =>
  ({ pemilik: '/dashboard', pelayan: '/order', pelanggan: '/catalog' }[role] || '/login')