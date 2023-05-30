import { Fragment, useEffect, useImperativeHandle, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Meet The Team', href: '#Developer', current: false },
  { name: 'Tokenomics', href: '#Tokenomics', current: false },
  { name: 'Roadmap', href: '#Roadmap', current: false },
  { name: 'Whitepaper ', href: '#', current: false },
  { name: 'Staking', href: '/staking', current: false },
  { name: 'NFT Mint', href: '/nftmint', current: false },
  { name: 'NFT Stake', href: '/nftstake', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example(props) {

  const navigate = useNavigate();

  useEffect(() => {
    if (props.name == "Staking") navigation[4].current = true;
    if (props.name == "NFTmint") navigation[5].current = true;
    if (props.name == "NFTstaking") navigation[6].current = true;
  });

  function gotoLanding(index) {
    if (index >= 0 & index <= navigation.length) {
      for (let i = 0; i < navigation.length; i++) {
        if (i == index) {
          navigation[i].current = true;
        }
        else {
          navigation[i].current = false;
        }
      }
    }
    if (index > 3) navigate(navigation[index].href);
    else navigate('/');
  }

  console.log("connected", props.isConnected);

  return (
    <Disclosure as="nav" className="bg-gray-800 py-2 fixed inset-x-0 z-10" style={{ backgroundColor: "#00000077" }}>
      {({ open }) => (
        <>
          <div className="max-w-7x py-1 px-4 sm:px-8 lg:px-12">
            <div className="relative flex h-14 _md:h-10 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden" style={{ width: "120px" }}>

              </div>

              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                <Disclosure.Button style={{ marginRight: "1px" }} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>

                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start hover:cursor-pointer">
                {/* Normal navigation*/}
                <div className="flex flex-shrink-0 items-center _lg:hidden">

                  {/* <img className='mt-6' src="img/pepe_text.png" style={{width: "100px", height:"30px"}}></img> */}
                </div>
                <div className="hidden sm:ml-6 lg:block w-full pt-2">
                  <div className="flex flex-row justify-center items-center space-x-4 text-center" style={{ justifyContent: "end" }}>
                    {navigation.map((item, index) => (

                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => gotoLanding(index)}
                        style={{ fontWeight: "bold" }}
                        className={classNames(
                          item.current ? 'bg-gray-800 text-white font-bold' : 'font-bold text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium lg:text-base'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        target={item.name == "Staking" ? "_self" : "_self"}
                      >
                        {item.name}
                      </a>
                    ))}
                    <> {/* connect button */}
                      {
                        props.isConnected ?
                          <button className='connect_button text-white font-bold rounded-md px-3 py-2 text-sm font-medium lg:text-base'
                            onClick={() => { props.logoutOfWeb3Modal() }}>
                            {props.curAcount.slice(0, 8) + "..." + props.curAcount.slice(34)}
                          </button> :
                          <button className='connect_button text-white font-bold rounded-md px-3 py-2 text-sm font-medium lg:text-base'
                            onClick={() => { props.loadWeb3Modal() }}>
                            Connect Wallet
                          </button>
                      }
                    </>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Disclosure.Panel className="lg:hidden w-full">
            <div className="space-y-1 px-2 pb-3 pt-2 overflow">
              {navigation.map((item, index) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => gotoLanding(index)}
                  style={{ fontWeight: "bold" }}
                  className={classNames(
                    item.current ? 'bg-gray-800 text-white font-bold' : 'font-bold text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <button className="wallet_connect" label="Connect" style={{ width: "120px" }}>Connect Wallet</button>
            </div>
          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  )
}
