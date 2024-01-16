  const fetchMagentoToken = async () => {
    const response = await fetch('https://magento2.test/rest/V1/integration/admin/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: process.env.REACT_APP_MAGENTO_USERNAME,
        password: process.env.REACT_APP_MAGENTO_PASSWORD,
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get Magento token');
    }
  
    return data;
  };
  
  export { fetchMagentoToken };


  const fetchOrderDetails = async (token, incrementId) => {
    const response = await fetch(`https://magento2.test/rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=increment_id&searchCriteria[filter_groups][0][filters][0][value]=${incrementId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get order details');
    }
  
    return data;
  };
  
  export { fetchOrderDetails };

