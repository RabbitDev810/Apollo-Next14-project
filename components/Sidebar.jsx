import React, { useMemo, useState, useEffect } from 'react';
import classes from '../styles/Sidebar.module.css';
import { ethers } from 'ethers';
const abi = require('../abi/ApolloABI.json');
const routerABI = require('../abi/RouterABI.json');
import axios from 'axios';
import { useRouter } from 'next/router';
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { useAccount, useContractRead } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEthersSigner } from '../lib/etherscan/etherscan';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export default function Sidebar({ user }) {
  const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
  const burnWallet = '0x000000000000000000000000000000000000dEaD';
  const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const tokenAddress = process.env.contract_address;
  const router = useRouter();

  const [opened, setOpened] = useState(false);
  const [tier, setTier] = useState(2);
  const [time, setTime] = useState(2);
  const [flag, setFlag] = useState(false);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(0);
  const [priceUSDC, setPriceUSDC] = useState(0);
  const initialWalletDetails = {
    tokens: 0,
    value: 0,
    burned: 0,
    reflections: 0,
    reflectionsWorth: 0,
  };
  const [walletDetails, setWalletDetails] = useState(initialWalletDetails);
  const chainId = 1;
  const signer = useEthersSigner({ chainId });

  const { address, isConnected } = useAccount(); // Dont use wagmi values directly to JSX, it would cause hydration error.
  const [address2Render, setAddress2Render] = useState('');

  useEffect(() => {
    console.log('address is ', address, ' connected ? ', isConnected);
    if (address != null && address != '' && isConnected) {
      setAddress2Render(address);
      getWalletValue();
      createUserIfNotExists();
    } else {
      setAddress2Render('');
      setWalletDetails(initialWalletDetails);
    }
  }, [address, isConnected]);

  // useEffect(() => {
  //     if(address != null && address != "") {
  //         //let price = getSubscriptionPrice()
  //         let price = 0
  //         setPriceUSDC(price)
  //         setAmount(0)
  //         //getPriceInApollo(price)
  //     } else {
  //         setPriceUSDC(0)
  //         setAmount(0)
  //     }
  // }, [tier, time, address])

  const formatNumber = (val) => {
    if (val == 0) return 0;

    if (val < 0.001) {
      let t = val;
      let count = 0;
      while (t < 0.1) {
        t *= 10;
        count++;
      }
      const lastString = t.toString().slice(2, 4);
      return count;
      // <>
      //   <span>0.0</span>
      //   <span className="text-xs">{count}</span>
      //   <span>{lastString}</span>
      // </>
    }

    return (
      (() => {
        if (val >= 1000000000000) {
          return val / 1000000000000;
        }
        if (val >= 1000000000) {
          return val / 1000000000;
        }
        if (val >= 1000000) {
          return val / 1000000;
        }
        if (val >= 1000) {
          return val / 1000;
        }
        if (val >= 0.1) {
          return val;
        }
        if (val >= 0.01) {
          return val.toLocaleString('en-us', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
          });
        }
        if (val >= 0.001) {
          return val.toLocaleString('en-us', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 4,
          });
        }
        return val;
      })().toLocaleString('en-us', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) +
      (() => {
        if (val >= 1000000000000) {
          return 'T';
        }
        if (val >= 1000000000) {
          return 'B';
        }
        if (val >= 100000) {
          return 'M';
        }
        if (val >= 1000) {
          return 'k';
        }
        return '';
      })()
    );
  };

  const createUserIfNotExists = async () => {
    await axios.post('/api/users', { wallet_address: address });
  };

  const getTokenPrice = async () => {
    try {
      const ethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
      const tokenAddress = process.env.contract_address;

      const amountOut = await routerContract.getAmountsOut(
        ethers.utils.parseEther(getPriceInEth().toString()),
        [ethAddress, tokenAddress]
      );
      let formatted = parseFloat(
        ethers.utils.formatEther(amountOut[1])
      ).toFixed(4);

      setPriceApollo(formatted);
    } catch (error) {
      throw error;
    }
  };

  const getSubscriptionPrice = (tier, time) => {
    if(tier == 1) {
        if(time == 1) return 30/2
        if(time == 2) return 70/2
        if(time == 3) return 140/2
    }
    if(tier == 2) {
        if(time == 1) return 65/2
        if(time == 2) return 150/2
        if(time == 3) return 300/2
    }
    if(tier == 3) {
        if(time == 1) return 80/2
        if(time == 2) return 190/2
        if(time == 3) return 380/2
    }
  };

  const getPriceInApollo = async (price) => {
    const _amountOut = await publicClient.readContract({
      address: routerAddress,
      abi: routerABI,
      functionName: 'getAmountsOut',
      args: [
        ethers.utils.parseUnits(price.toString(), 6),
        [usdcAddress, tokenAddress]
      ]
    });
    return ethers.utils.formatUnits(_amountOut[1], 9);
  };

  const { data: balance } = useContractRead({
    address: tokenAddress,
    abi: abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: reflections } = useContractRead({
    address: tokenAddress,
    abi: abi,
    functionName: 'rewardsEarned',
    args: [address],
  });

  const { data: userInfo } = useContractRead({
    address: tokenAddress,
    abi: abi,
    functionName: 'userInfo',
    args: [address],
  });

  const { data: amountOutForBalance } = useContractRead({
    address: routerAddress,
    abi: routerABI,
    functionName: 'getAmountsOut',
    args: [balance, [tokenAddress, usdcAddress]],
  });

  const { data: amountOutForReflections } = useContractRead({
    address: routerAddress,
    abi: routerABI,
    functionName: 'getAmountsOut',
    args: [reflections, [tokenAddress, usdcAddress]],
  });

  const getWalletValue = async () => {
    /*
    let burnt = parseFloat(
      ethers.utils.formatUnits(userInfo[1], 9)
    ).toLocaleString('en-us', { maximumFractionDigits: 0 });
    
    let formattedBalance = parseFloat(
      ethers.utils.formatUnits(balance, 9)
    ).toLocaleString('en-us', { maximumFractionDigits: 0 });

    let formatted =
      balance == 0
        ? 0
        : parseFloat(ethers.utils.formatUnits(amountOutForBalance[1], 6)).toLocaleString(
            'en-us',
            { maximumFractionDigits: 2 }
          );

    let reflectionsWorth = 0
      reflections == 0
        ? 0
        : parseFloat(
            ethers.utils.formatUnits(amountOutForReflections[1], 6)
          ).toLocaleString('en-us', { maximumFractionDigits: 2 });
      
      setWalletDetails({
        tokens: formattedBalance,
        value: formatted,
        burned: burnt,
        reflections: parseFloat(
          ethers.utils.formatUnits(reflections, 9)
        ).toLocaleString('en-us', { maximumFractionDigits: 0 }),
        reflectionsWorth,
      });
    */
    setWalletDetails({
      tokens: 0,
      value: 0,
      burned: 0,
      reflections: 0,
    });

  };

  const text = useMemo(() => {
    let selectedTime;
    switch (time) {
      case 1:
        selectedTime = '3 days';
        break;
      case 2:
        selectedTime = '1 week';
        break;
      case 3:
        selectedTime = '2 weeks';
        break;
      default:
        break;
    }
    return `${selectedTime} of tier ${tier} access`;
  }, [time, tier]);

  const getPriceInEth = () => {
    let tier1costperday = 0.001;
    let tier2costperday = 0.0015;
    let tier3costperday = 0.002;

    switch (tier) {
      case 1:
        return tier1costperday * getTimeInDays();
      case 2:
        return tier2costperday * getTimeInDays();
      case 3:
        return tier3costperday * getTimeInDays();
    }
  };

  const getTimeInDays = (paramTimer) => {
    switch (paramTimer) {
      case 1:
        return 3; //3 days
      case 2:
        return 7; //1 week
      case 3:
        return 14; //2 weeks
    }
  };

  const burnToken = async (manual) => {
    let tempTier = tier;
    let tempDays = getTimeInDays(time);
    const contract = new ethers.Contract(tokenAddress, abi, signer);
    if (parseFloat(amount) > 0) {
      if (manual) {
        try {
          const estimatedGas = await contract.estimateGas.transfer(
            burnWallet,
            ethers.utils.parseUnits((parseInt(amount) + 1).toString(), 9)
          );
          await contract.transfer(
            burnWallet,
            ethers.utils.parseUnits(parseInt(amount).toString(), 9),
            { gasLimit: estimatedGas }
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        await axios.post("/api/users/updatesubscriptionstatus", {
          tier: tempTier,
          days: tempDays,
        });
        router.reload();
      }
    }
  };

  useEffect(() => {
    const realTier = tier;
    const realTimer = time;
    if (user != null && address != '' && address != null) {
      calculateAmount(realTier, realTimer);
    }
  }, [time, tier, walletDetails.tokens, user]);

  const calculateAmount = async (realTier, realTimer) => {
    const tempUSDC = getSubscriptionPrice(realTier, realTimer);
    const tempApollo = await getPriceInApollo(tempUSDC);

    let expireDate = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * getTimeInDays(realTimer)
    );
    if (
      parseInt(user.access_level) == realTier &&
      new Date(user.expire) >= expireDate
    ) {
      setPriceUSDC(0);
      setError(0);
      setAmount(0);
    } else {
      const balance = 0; // await tokenContract.balanceOf(address);

      const tokens = parseFloat(ethers.utils.formatUnits(balance, 9));

      if (parseFloat(tempApollo) > parseFloat(tokens)) {
        setError(2);
      } else {
        setError(0);
      }

      setPriceUSDC(tempUSDC);
      setAmount(tempApollo);
    }
  };

  if (user == null) {
    return <></>;
  }

  return (
    <>
      <button
        className={`${classes.icon} ${opened ? classes.open : ''}`}
        onClick={() => setOpened(!opened)}
      >
        <img
          src={opened ? '/arrow-left.png' : '/arrow-right.png'}
          alt="Arrow"
        />
      </button>
      <div
        className={`${classes.sidebar} ${
          opened ? classes.open : ''
        } rounded-r-2xl`}
      >
        <div className={classes.sidebarHeader}>
          <ConnectButton />
        </div>
        <div className={classes.sidebarBody}>
          <div className={classes.row}>
            <div>
              <p>Balance</p>
              <h6>{walletDetails.tokens}</h6>
            </div>
            <div>
              <p>Tokens Burned</p>
              <h6>{walletDetails.burned}</h6>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <p>Wallet Value</p>
              <h6>${walletDetails.value}</h6>
            </div>
            <div>
              <p>Reflections Since Last Tx</p>
              <h6>{walletDetails.reflections}</h6>
              <p>(${walletDetails.reflectionsWorth})</p>
            </div>
          </div>

          <div className="align-middle">
            <label className="inline-flex relative align-middle cursor-pointer">
              <input
                type="checkbox"
                checked={flag}
                onChange={() => {
                  if (!flag) {
                    setAmount(0);
                    setPriceUSDC(0);
                    setError(0);
                  } else {
                    calculateAmount(tier, time);
                  }
                  setFlag(!flag);
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 mx-auto rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span
              style={{
                color: 'white',
                marginLeft: '10px',
                fontWeight: 700,
              }}
            >
              Manual Burn
            </span>
          </div>

          {!flag ? (
            <>
              <div className={classes.boxes}>
                <h4>Access Tier</h4>
                <div className={classes.container}>
                  <div className={classes.line}></div>
                  <div
                    onClick={() => {
                      // calculateAmount(1, 0)
                      setTier(1);
                    }}
                  >
                    <div
                      className={`${classes.box} ${
                        tier === 1 ? classes.active : ''
                      }`}
                    ></div>
                    <p>Tier 1</p>
                  </div>
                  <div
                    onClick={() => {
                      // calculateAmount(2, 0)
                      setTier(2);
                    }}
                  >
                    <div
                      className={`${classes.box} ${
                        tier === 2 ? classes.active : ''
                      }`}
                    ></div>
                    <p>Tier 2</p>
                  </div>
                  <div
                    onClick={() => {
                      // calculateAmount(3, 0)
                      setTier(3);
                    }}
                  >
                    <div
                      className={`${classes.box} ${
                        tier === 3 ? classes.active : ''
                      }`}
                    ></div>
                    <p>Tier 3</p>
                  </div>
                </div>
              </div>
              <div className={classes.boxes}>
                <h4>Time</h4>
                <div className={classes.container}>
                  <div className={classes.line}></div>
                  <div
                    onClick={() => {
                      // calculateAmount(0, 1)
                      setTime(1);
                    }}
                  >
                    <div
                      className={`${classes.box} ${
                        time === 1 ? classes.active : ''
                      }`}
                    ></div>
                    <p>3 days</p>
                  </div>
                  <div
                    onClick={() => {
                      // calculateAmount(0, 2)
                      setTime(2);
                    }}
                  >
                    <div
                      className={`${classes.box} ${
                        time === 2 ? classes.active : ''
                      }`}
                    ></div>
                    <p>1 week</p>
                  </div>
                  <div
                    onClick={() => {
                      // calculateAmount(0, 3)
                      setTime(3);
                    }}
                  >
                    <div
                      className={`${classes.box} ${
                        time === 3 ? classes.active : ''
                      }`}
                    ></div>
                    <p>2 weeks</p>
                  </div>
                </div>
              </div>
              <h4 className={classes.subtitle}>Available Features</h4>
              <div className={classes.table}>
                <div
                  className={`${classes.tableShadow} ${
                    tier === 1
                      ? classes.tier1
                      : tier === 2
                      ? classes.tier2
                      : classes.tier3
                  }`}
                ></div>
                <div className={classes.tableHeader}>
                  <div>Tiers</div>
                  <div>Free</div>
                  <div>Tier 1</div>
                  <div>Tier 2</div>
                  <div>Tier 3</div>
                </div>
                <div className={`${classes.tableRow} ${classes.first}`}>
                  <div>
                    <p>Features</p>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className={classes.tableRow}>
                  <div>Access to calls</div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                </div>
                <div className={classes.tableRow}>
                  <div>Upvote calls</div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                </div>
                <div className={classes.tableRow}>
                  <div>Sorting & Filtering</div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                </div>
                <div className={classes.tableRow}>
                  <div>Search for marketers</div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                </div>
                <div className={classes.tableRow}>
                  <div>Detailed marketer analysis</div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/not-included.png" alt="Not Included" />
                  </div>
                  <div>
                    <img src="/included.png" alt="Included" />
                  </div>
                </div>
              </div>
              <h4 className={classes.subtitle}>{text}</h4>
              <div className={classes.burn}>
                <img src="/apollo-rocket.png" alt="Rocket" />
                <p className="text-white text-[20px] text-left mr-auto">
                  Apollo
                </p>
                <div className="flex flex-col price-display text-white">
                  <p className="text-right text-[20px]">
                    {parseFloat(amount).toLocaleString('en-us', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    Apollo
                  </p>
                  {error == 1 ? (
                    <p
                      style={{ textAlign: 'right' }}
                      className="text-[12px] text-red-400"
                    >
                      Less than 0
                    </p>
                  ) : error == 2 ? (
                    <p
                      style={{ textAlign: 'right' }}
                      className="text-[12px] text-red-400"
                    >
                      More than {walletDetails.tokens}
                    </p>
                  ) : (
                    <></>
                  )}
                  <p className="text-white/50 text-[15px] ml-auto text-right">
                    ${priceUSDC?.toFixed(2)}
                  </p>
                </div>
                {address2Render != '' ? (
                  <button onClick={() => burnToken(false)}>Burn Now</button>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={classes.burn} style={{ marginTop: '20px' }}>
                <img src="/apollo-rocket.png" alt="Rocket" />
                <p className="text-white text-[20px] text-left mr-auto">
                  Apollo
                </p>
                <div className="flex flex-col price-display text-white">
                  <p className="text-right text-[20px]">
                    <input
                      value={amount}
                      type="number"
                      onChange={(e) => {
                        if (parseInt(e.target.value) <= 0) {
                          setError(1);
                        } else {
                          if (parseInt(e.target.value) > walletDetails.tokens) {
                            setError(2);
                          } else {
                            setError(0);
                          }
                        }
                        setAmount(e.target.value);
                      }}
                      style={{
                        color: 'white',
                        marginBottom: '5px',
                        textAlign: 'right',
                      }}
                      className="w-28 outline-none rounded bg-transparent"
                    ></input>{' '}
                    Apollo
                  </p>
                  {error == 1 ? (
                    <p
                      style={{ textAlign: 'right' }}
                      className="text-[12px] text-red-400"
                    >
                      Less than 0
                    </p>
                  ) : error == 2 ? (
                    <p
                      style={{ textAlign: 'right' }}
                      className="text-[12px] text-red-400"
                    >
                      More than {walletDetails.tokens}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                {address2Render != '' ? (
                  <button onClick={() => burnToken(true)}>Burn Now</button>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
