import React from 'react'
import SimpleCard from '@components/SimpleCard/SimpleCard';
import Text from '@components/Text/Text';
import Header from '../Header/Header'
import Accordion from '../Accordion/Accordion';

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
                                <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='grid-start-1 grid-span-2'>
                                    Earnings:
                                </Text>  
                                <Text  fontSize='16px' fontSizeSm={'16px'} className='grid-start-1 grid-span-2 mt-[10px]'>
                                50% <span className='text-[12px] text-[#E4168F]'>Winner</span>
                                </Text> 
                                <Text  color={'background: #FFFFFF'} fontSize='16px' fontSizeSm={'16px'} className='grid-start-1 grid-span-2'>
                                    20% <span className='text-[12px] text-[#E4168F]'>Runner-up</span>
                                </Text> 
                                <Text  color={'background: #FFFFFF'} fontSize='16px' fontSizeSm={'16px'} className='grid-start-1 grid-span-2'>
                                    10% <span className='text-[12px] text-[#E4168F]'>3rd place</span>
                                </Text> 
                            </div>
                        </div>
                        <div className=' gap-1 col-span-3'>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                Name: <span className='text-[14px]'>prueba</span>
                            </Text>
                            <Text color={'background: #FFFFFF'} fontSize='18px' fontSizeSm={'16px'} className='mb-[10px]'>
                                UBI donation: <span className='text-[14px]'>3%</span>
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
                    {props.data.map((dataGroup, i) => <Accordion data={dataGroup} key={i} number={i}/>)}
                </div>
            </SimpleCard>
        </section>
    )
}

export default ContentTable;