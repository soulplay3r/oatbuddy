/**
 * FAQs — grouped by category. Edit questions and answers here.
 * Answers marked `placeholder: true` show a "to be confirmed" note until
 * verified information is written in.
 */
export type FAQCategory = "Usage" | "Ingredients" | "Safety" | "Shipping & orders";

export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  placeholder?: boolean;
}

export const faqCategories: FAQCategory[] = ["Usage", "Ingredients", "Safety", "Shipping & orders"];

export const faqs: FAQ[] = [
  // Usage
  {
    id: "what-are-overnight-oats",
    category: "Usage",
    question: "What are overnight oats?",
    answer:
      "Overnight oats are oats that soften by soaking (usually in milk, yoghurt or a plant-based alternative) for a few hours instead of being cooked. The result is a creamy, spoonable breakfast.",
  },
  {
    id: "instant-vs-overnight",
    category: "Usage",
    question: "What does “instant & overnight” mean?",
    answer:
      "It means the same bottle can be prepared two ways: quickly, for when you need breakfast now, or soaked overnight for a thicker, creamier texture. Exact steps and timings for each method will be listed here and on the label.",
    placeholder: true,
  },
  {
    id: "how-to-prepare",
    category: "Usage",
    question: "How do I prepare them?",
    answer:
      "Step-by-step preparation instructions will be added here once they are finalised. You'll also find them on each product page and on the label.",
    placeholder: true,
  },
  {
    id: "all-three",
    category: "Usage",
    question: "Can I order all three flavours together?",
    answer:
      "Yes. The Discovery Trio includes one Mango Mischief, one Strawberry Love and one Chocolate Brownie. You can also add any mix of individual bottles to your cart.",
  },

  // Ingredients
  {
    id: "ingredients",
    category: "Ingredients",
    question: "What ingredients are used?",
    answer:
      "The full ingredient list for each flavour will be published on its product page once verified, in the same order as on the label.",
    placeholder: true,
  },
  {
    id: "nutrition",
    category: "Ingredients",
    question: "Where can I find nutritional information?",
    answer:
      "Each product page has a nutrition section. The complete nutrition panel, including whether values are for the dry mix or as prepared with milk, will be published there once confirmed.",
    placeholder: true,
  },
  {
    id: "evidence",
    category: "Ingredients",
    question: "How do you back up your claims?",
    answer:
      "Every claim we make should be supported by evidence. Product pages and our Science page will list the references behind each claim as they are finalised.",
  },

  // Safety
  {
    id: "allergens",
    category: "Safety",
    question: "Do your products contain allergens?",
    answer:
      "Allergen information for each flavour will be listed on its product page and on the label. Always check the label before eating if you have an allergy.",
    placeholder: true,
  },
  {
    id: "medical",
    category: "Safety",
    question: "Are your products suitable for me?",
    answer:
      "If you have a medical condition, are pregnant or breastfeeding, or have specific dietary requirements, check the full ingredient and nutrition information and speak to your doctor or a registered dietitian before adding a new product to your diet.",
  },
  {
    id: "storage",
    category: "Safety",
    question: "How should I store the product?",
    answer:
      "Storage instructions and shelf life will be confirmed before launch and listed here, on each product page and on the label.",
    placeholder: true,
  },

  // Shipping & orders
  {
    id: "how-to-order",
    category: "Shipping & orders",
    question: "How can I place an order?",
    answer:
      "Pick your flavours on the Shop page, add them to your cart and head to checkout. Online payments are not switched on yet. We'll update this answer as soon as ordering opens.",
  },
  {
    id: "delivery",
    category: "Shipping & orders",
    question: "Where do you deliver, and how long does it take?",
    answer: "Delivery areas, timelines and charges will be shared here once our delivery partners are confirmed.",
    placeholder: true,
  },
  {
    id: "returns",
    category: "Shipping & orders",
    question: "What is your returns policy?",
    answer: "Our shipping and returns policy is being finalised and will be published on the Shipping and Returns page.",
    placeholder: true,
  },
  {
    id: "contact",
    category: "Shipping & orders",
    question: "How can I contact Mito.living?",
    answer: "Our contact details are on their way. Once they're live you'll find them here and in the footer of every page.",
    placeholder: true,
  },
];
