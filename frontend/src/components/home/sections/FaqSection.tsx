"use client";

// This component renders the FAQ section on the homepage, providing answers to common questions about hiring local technicians in Ethiopia. It uses an accordion layout for easy navigation and readability.
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const faqs = [
  {
    value: "item-1",
    question: "How do I book a technician for a home repair?",
    answer: "You can easily book a technician by searching for the service you need, such as plumbing, electrical work, or electronics repair. Browse profiles, check reviews, and request a booking directly through our platform."
  },
  {
    value: "item-2",
    question: "Are the technicians verified and trustworthy?",
    answer: "Yes! All professionals on our platform, including dish installers, painters, and electricians, go through a strict verification process. We check their IDs, credentials, and gather background information to ensure safety and quality in Ethiopia."
  },
  {
    value: "item-3",
    question: "How does the payment process work?",
    answer: "We offer secure payments. You agree on a price with the technician based on the scope of the job (e.g., house painting or fixing a TV). Payment is processed securely and only released when the job is completed to your satisfaction."
  },
  {
    value: "item-4",
    question: "What if I am not satisfied with the repair?",
    answer: "Your satisfaction is our priority. If an electronics repair or plumbing job doesn't meet the agreed standards, our dispute resolution team will step in to ensure the issue is fixed or your payment is protected."
  },
  {
    value: "item-5",
    question: "Can I get an emergency electrician or plumber?",
    answer: "Absolutely. When posting a job, you can mark it as 'Urgent'. Available local technicians will be notified immediately to respond to your emergency repair needs."
  }
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            Got Questions?
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase leading-none mb-6">
            Frequently Asked <span className="text-primary">Questions</span>.
          </h2>
          <p className="text-muted-foreground font-medium">
            Everything you need to know about finding and hiring local technicians in Ethiopia.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={faq.value} 
              value={faq.value} 
              className="border border-border bg-slate-50 dark:bg-slate-900 px-6 rounded-none data-[state=open]:border-primary transition-colors"
            >
              <AccordionTrigger className="hover:no-underline font-bold text-lg py-5 group">
                <span className="group-data-[state=open]:text-primary text-left transition-colors">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
