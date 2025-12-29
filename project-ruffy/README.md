# Ruffy.dog 🐶
A lightweight, consumer-facing tool that helps pet owners quickly check whether foods and common household items are safe or toxic for dogs.

Live site: https://ruffy.dog

---

## Purpose

Ruffy.dog is designed for speed and clarity in a high-stakes, everyday scenario:  
*“My dog ate something — is this safe?”*

The project intentionally avoids overengineering in favor of:
- Clear answers
- Predictable behavior
- Transparent data sources
- Low operational overhead

This is an informational tool, not a replacement for veterinary care.

---

## How It Works

- Users search for a food or item
- Results are categorized as **Safe**, **Use Caution**, or **Toxic**
- When no match is found, the UI explicitly tells users and directs them to safer alternatives

All data is loaded client-side from a static dataset.

---

## Tech Stack

- **Frontend:** React
- **Data:** Static CSV files
- **Hosting:** Replit
- **Styling:** Lightweight CSS

AI tools were used to assist with iteration and scaffolding, while all data structure, classification logic, and scope decisions were made intentionally.

---

## Design Considerations

- Fast lookup over exhaustive coverage
- Explicit empty and error states to reduce user confusion
- No accounts, tracking, or backend dependencies
- Easy auditability of the underlying data

---

## Future Improvements

- Expanded dataset coverage
- Source citations per item
- Mobile-first UI refinements
- GA4 analytics (privacy-conscious)

---

## Disclaimer

Ruffy.dog provides general informational guidance only.  
It is not a substitute for professional veterinary advice.

If a dog has ingested a potentially harmful substance, consult a veterinarian immediately.
