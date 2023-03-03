export const MoneyFormat = (money) => {
	return Intl.NumberFormat('en-US',
		{
			style: 'currency',
			currency: 'USD'
		}
	).format(money);
}
