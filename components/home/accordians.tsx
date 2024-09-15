import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Accordions = () => {
    return (
        <div className='my-12 mb-24'>
            <div className="mx-auto max-w-[58rem] items-center space-y-4 text-center mb-20" id="faq">
                <h2 className="text-3xl text-black dark:text-white font-bold text-center">
                    Frequently Asked Questions
                </h2>
                <p className="leading-normal dark:text-gray-300 sm:text-lg sm:leading-7 max-w-3xl pt-2 mx-auto">
                    Find answers to common questions from our gaming community.
                    For more detailed help, check out our knowledgebase articles or reach out to our support team.
                </p>
            </div>
            <Accordion type="single" collapsible className="w-full text-left space-y-2">
                <AccordionItem value="item-1" className="dark:bg-zinc-800 rounded-md px-4">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                        Currently PayPal and Stripe are accepted world, we accept all major credit and debit cards, we also accept PayPal.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="dark:bg-zinc-800 rounded-md px-4">
                    <AccordionTrigger>Is there a refund for my service?</AccordionTrigger>
                    <AccordionContent>
                        Yes, if you don&apos;t like our configuration we provide full refund within 3 days of purchase.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="dark:bg-zinc-800 rounded-md px-4">
                    <AccordionTrigger>Can I migrate my service to other location?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we can migrate your service to any location of your choice but it may take upto 1-2 days for migration.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="dark:bg-zinc-800 rounded-md px-4">
                    <AccordionTrigger>Can I upgrade my service after purchase?</AccordionTrigger>
                    <AccordionContent>
                        Yes, you can upgrade your service after purchase.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="dark:bg-zinc-800 rounded-md px-4">
                    <AccordionTrigger>Do you allow custom plugins and modifications on the game server?</AccordionTrigger>
                    <AccordionContent>
                        Yes, you can install plugins or any mods to your server from our web interface control panel.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default Accordions;
