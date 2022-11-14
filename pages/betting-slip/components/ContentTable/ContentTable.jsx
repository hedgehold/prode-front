import React, { useEffect } from 'react'
import SimpleCard from '@components/SimpleCard/SimpleCard';
import Text from '@components/Text/Text';
import Header from '../Header/Header'
import Accordion from '../Accordion/Accordion';
import Paper from '../Paper/Paper';

const ContentTable = (props) => {
    return (
        <section className='w-full container relative px-8 md:px-28 mx-auto pb-36c pt-52'>
            <SimpleCard>
                <div className='w-full md:p-12'>
                    <div className='flex flex-col mb-4 md:mb-5'>
                        <Text tag={'h1'} color={'#64CC98'} fontSize='36px' fontSizeSm={'20px'}>
                            Join Tournament
                        </Text>
                    </div>
                    <Header />
                    <div className='flex flex-col mb-[20px]  mt-[20px] pt-5'>
                        <Text tag={'h1'} color={'#64CC98'} fontSize='36px' fontSizeSm={'20px'}>
                            Tournament settings
                        </Text>
                    </div>
                    <div className='gap-10 grid grid-cols-6'>
                        <div className=' gap-1 col-start-1 col-span-3'>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                Name: <span className='text-[14px]'>prueba</span>
                            </Text>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                Buy-in: <span className='text-[14px]'>10 xDAI</span>
                            </Text>
                            <div className=' grid grid-start-2'>
                            <Text tag={'h1'} color={'background: #FFFFFF'} fontSize='22px' fontSizeSm={'28.6px'}>
                                Earnings: 50% Winner
                            </Text>
                            <Text tag={'h1'} color={'background: #FFFFFF'} fontSize='22px' fontSizeSm={'28.6px'} style={{ marginLeft: '110px' }}></Text>
                            </div>
                        </div>
                        <div className=' gap-1 col-span-3'>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                Name: <span className='text-[14px]'>prueba</span>
                            </Text>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                Format: <span className='text-[14px]'>Open</span>
                            </Text>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                Participants: <span className='text-[14px]'>20</span>
                            </Text>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                TLV: <span className='text-[14px]'>200 xDAI</span>
                            </Text>
                        </div>
                    </div>
                    <div className='flex flex-col mb-4 md:mb-16 pt-10'>
                        <Text tag={'h1'} color={'#64CC98'} fontSize='36px' fontSizeSm={'20px'}>
                            Betting Slip
                        </Text>
                    </div>
                    {props.data.map((dataGroup, i) => <Accordion data={dataGroup} key={i} number={i} setFixtureId={props.setFixtureId} handleChangeGroups={props.handleChangeGroups}/> )}
                </div>
                <Paper />
                <div class="grid grid-cols-4 gap-1">
                    <div>
                        <Text
                            fontSize='36px'
                            lineHeight='40px'
                            fontSizeSm={'10px'}
                            className="mt-6 text-center"
                            style={{ color: '#00E5AE', marginTop: '30px' }}
                        >
                            Buy-in
                        </Text>
                    </div>
                    <div>
                        <Text
                            fontSize='22px'
                            lineHeight='40px'
                            fontSizeSm={'10px'}
                            className="mt-6 text-center"
                            style={{ padding: '10px', background: '#333647', borderRadius: '10px' }}
                            color="secondary">
                            10 xDAI
                        </Text>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <div>
                        <Text
                            fontSize='36px'
                            lineHeight='40px'
                            fontSizeSm={'10px'}
                            className="mt-6 text-center"
                            style={{ color: '#00E5AE', marginTop: '30px' }}
                        >
                            In-Tournay nickname: 
                        </Text>
                    </div>
                    <div>
                        <Text
                            fontSize='22px'
                            lineHeight='40px'
                            fontSizeSm={'10px'}
                            className="mt-6 text-center"
                            style={{ padding: '10px', background: '#262333', borderRadius: '10px', color: '#E4168F'}}
                            color="secondary">
                            Tule
                        </Text>
                    </div>
                </div>
            </SimpleCard>
        </section>
    )
}

export default ContentTable;