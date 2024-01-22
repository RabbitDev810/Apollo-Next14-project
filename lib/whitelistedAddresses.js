const whitelistedAddresses = [

]

export default (address) => whitelistedAddresses.filter(a => a.toLowerCase() == address.toLowerCase()).length > 0
