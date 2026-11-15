/**
 * FAQs — edit questions and answers here.
 * Answers marked `placeholder: true` are shown with a "to be confirmed"
 * note until verified information is written in.
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  placeholder?: boolean;
}

export const faqs: FAQ[] = [
  {
    id: "what-are-overnight-oats",
    question: "What are overnight oats?",
    answer:
      "Overnight oats are oats that soften by soaking — usually in milk, yoghurt or a plant-based alternative — for a few hours instead of being cooked. The result is a creamy, spoonable breakfast that's ready when you are.",
  },
  {
    id: "how-to-prepare",
    question: "How do I prepare them?",
    answer:
      "Step-by-step preparation instructions for our bottles will be added here once they are finalised. You'll also find them on each product page and on the label.",
    placeholder: true,
  },
  {
    id: "storage",
    question: "How should I store the product?",
    answer:
      "Storage instructions and shelf life will be confirmed before launch and listed here, on each product page and on the label.",
    placeholder: true,
  },
  {
    id: "ingredients",
    question: "What ingredients are used?",
    answer:
      "The full ingredient list, nutritional information and allergen details for each flavour will be published on its product page once verified.",
    placeholder: true,
  },
  {
    id: "how-to-order",
    question: "How can I place an order?",
    answer:
      "Pick your flavours on the Shop page, add them to your cart and head to checkout. Online payments are not switched on yet — we'll update this answer as soon as ordering opens.",
  },
  {
    id: "all-three",
    question: "Can I order all three flavours together?",
    answer:
      "Yes! The Discovery Trio includes one Mango Mischief, one Strawberry Love and one Chocolate Brownie. You can also add any mix of individual bottles to your cart.",
  },
  {
    id: "contact",
    question: "How can I contact the brand?",
    answer:
      "Our contact details are on their way. Once they're live you'll find them here and in the footer of every page.",
    placeholder: true,
  },
];
