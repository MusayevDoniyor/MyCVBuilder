// PDF export uchun maxsus CSS stillar

export const applyPDFStyles = (element: HTMLElement) => {
  // PDF uchun maxsus stillar
  const pdfStyles = `
    /* PDF uchun maxsus stillar */
    .pdf-export * {
      box-sizing: border-box !important;
      page-break-inside: avoid !important;
    }

    .pdf-export .card,
    .pdf-export .bg-white,
    .pdf-export .bg-gray-50,
    .pdf-export .bg-gray-100 {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      margin-bottom: 1rem !important;
    }

    .pdf-export .flex {
      display: block !important;
    }

    .pdf-export .grid {
      display: block !important;
    }

    .pdf-export .flex-wrap {
      display: block !important;
    }

    .pdf-export .space-y-2 > * + * {
      margin-top: 0.5rem !important;
    }

    .pdf-export .space-y-4 > * + * {
      margin-top: 1rem !important;
    }

    .pdf-export .space-y-6 > * + * {
      margin-top: 1.5rem !important;
    }

    .pdf-export .gap-2 {
      gap: 0.5rem !important;
    }

    .pdf-export .gap-4 {
      gap: 1rem !important;
    }

    .pdf-export .p-4 {
      padding: 1rem !important;
    }

    .pdf-export .p-6 {
      padding: 1.5rem !important;
    }

    .pdf-export .p-8 {
      padding: 2rem !important;
    }

    .pdf-export .mb-4 {
      margin-bottom: 1rem !important;
    }

    .pdf-export .mb-6 {
      margin-bottom: 1.5rem !important;
    }

    .pdf-export .rounded-lg {
      border-radius: 0.5rem !important;
    }

    .pdf-export .rounded-xl {
      border-radius: 0.75rem !important;
    }

    .pdf-export .shadow-lg {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
    }

    .pdf-export .border {
      border: 1px solid #e5e7eb !important;
    }

    .pdf-export .border-gray-200 {
      border-color: #e5e7eb !important;
    }

    /* Text stillar */
    .pdf-export h1,
    .pdf-export h2,
    .pdf-export h3,
    .pdf-export h4 {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }

    .pdf-export p {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* Skills va projects uchun */
    .pdf-export .flex.flex-wrap {
      display: block !important;
    }

    .pdf-export .flex.flex-wrap > * {
      display: inline-block !important;
      margin: 0.25rem !important;
    }

    /* Tables uchun */
    .pdf-export table {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    .pdf-export tr {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* Lists uchun */
    .pdf-export ul,
    .pdf-export ol {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    .pdf-export li {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* Dark mode stillarini PDF da o'chirish */
    .pdf-export .dark {
      color: #111827 !important;
      background-color: #ffffff !important;
    }

    .pdf-export .dark * {
      color: inherit !important;
      background-color: transparent !important;
    }

    .pdf-export .dark .bg-gray-800 {
      background-color: #f9fafb !important;
    }

    .pdf-export .dark .bg-gray-700 {
      background-color: #f3f4f6 !important;
    }

    .pdf-export .dark .text-gray-100 {
      color: #111827 !important;
    }

    .pdf-export .dark .text-gray-200 {
      color: #374151 !important;
    }

    .pdf-export .dark .text-gray-300 {
      color: #6b7280 !important;
    }

    .pdf-export .dark .text-gray-400 {
      color: #9ca3af !important;
    }

    .pdf-export .dark .text-gray-500 {
      color: #6b7280 !important;
    }

    .pdf-export .dark .text-gray-600 {
      color: #4b5563 !important;
    }

    .pdf-export .dark .border-gray-600 {
      border-color: #e5e7eb !important;
    }

    .pdf-export .dark .border-gray-700 {
      border-color: #d1d5db !important;
    }

    /* Animatsiyalarni o'chirish */
    .pdf-export * {
      animation: none !important;
      transition: none !important;
    }

    /* Overflow muammolarini hal qilish */
    .pdf-export {
      overflow: visible !important;
    }

    .pdf-export * {
      overflow: visible !important;
    }

    /* Position muammolarini hal qilish */
    .pdf-export .absolute,
    .pdf-export .fixed {
      position: relative !important;
    }

    /* Z-index muammolarini hal qilish */
    .pdf-export * {
      z-index: auto !important;
    }
  `;

  // Style element yaratish
  const styleElement = document.createElement("style");
  styleElement.textContent = pdfStyles;
  element.appendChild(styleElement);

  // PDF class qo'shish
  element.classList.add("pdf-export");

  return () => {
    // Cleanup function
    element.classList.remove("pdf-export");
    if (styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  };
};
