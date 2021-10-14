export const ORDER_TABLE_FIELDS = {
  0: {
    item: 'Назва товару',
    quantity: 'Кількість',
    price: 'Ціна одиниці',
    size: 'Розмір',
    bagBottom: 'Дно рюкзака',
    sidePocket: 'Бокова кишеня',
    total: 'Підсумок',
    toPay: 'До сплати',
    photo: 'Фото',
    amountOfOrder: 'Сума замовлення'
  },
  1: {
    item: 'Product name',
    quantity: 'Quantity',
    price: 'Single item price',
    size: 'Size',
    bagBottom: 'Bag bottom',
    sidePocket: 'Side pocket',
    total: 'Total price',
    toPay: 'Total price to pay',
    photo: 'Photo',
    amountOfOrder: 'Order amount'
  }
};

export const ORDER_HISTORY_TABLE_FIELDS = {
  0: {
    order: 'ЗАМОВЛЕННЯ',
    date: 'ДАТА',
    status: 'СТАТУС',
    dated: 'від'
  },
  1: {
    order: 'ORDER',
    date: 'DATE',
    status: 'STATUS',
    dated: 'dated'
  }
};

export const ORDER_STATUSES = {
  CREATED: ['СТВОРЕНО', 'CREATED'],
  CONFIRMED: ['Підтвердженно', 'CONFIRMED'],
  CANCELLED: ['СКАСОВАНО', 'CANCELLED'],
  REFUNDED: ['ПОВЕРНЕНО КОШТИ', 'REFUNDED'],
  SENT: ['НАДІСЛАНО', 'SENT'],
  DELIVERED: ['ДОСТАВЛЕНО', 'DELIVERED'],
  PRODUCED: ['ВИГОТОВЛЕНО', 'PRODUCED']
};
