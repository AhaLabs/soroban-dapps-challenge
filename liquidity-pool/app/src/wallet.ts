import { getUserInfo, getNetworkDetails, isAllowed } from '@stellar/freighter-api';
export { setAllowed as enable } from '@stellar/freighter-api';

let account: string
let enabled: boolean
let network: string
let networkUrl: string
let networkPassphrase: string

type onChangeHandler = (args: {
  account: string
  enabled: boolean
  network: string
  networkUrl: string
  networkPassphrase: string
}) => Promise<void>;

const onChangeHandlers: onChangeHandler[] = [];

export function onChange(handler: onChangeHandler) {
  onChangeHandlers.push(handler);
};

async function refresh() {
  const [
    newUserInfo,
    newIsEnabled,
    newNetworkDetails,
  ] = await Promise.all([
    getUserInfo(),
    isAllowed(),
    getNetworkDetails(),
  ]);
  if (
    newUserInfo.publicKey !== account ||
    newIsEnabled !== enabled ||
    newNetworkDetails.network !== network ||
    newNetworkDetails.networkUrl !== networkUrl ||
    newNetworkDetails.networkPassphrase !== networkPassphrase
  ) {
    account = newUserInfo.publicKey;
    enabled = newIsEnabled;
    network = newNetworkDetails.network;
    networkUrl = newNetworkDetails.networkUrl;
    networkPassphrase = newNetworkDetails.networkPassphrase;
    await Promise.all(onChangeHandlers.map(fn => fn({
      account,
      enabled,
      network,
      networkUrl,
      networkPassphrase,
    })));
  }
}

setTimeout(refresh, 1);
setInterval(refresh, 1000);
