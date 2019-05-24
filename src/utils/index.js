export const genarateAssetCurrencyId = (asset_name, currency_name, id) => {
    return `${asset_name}_${currency_name}_${id}`;
}