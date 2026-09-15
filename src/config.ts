// ============================================================
// CONFIGURACIÓN CENTRAL DE 1492TOKENS
// Rellena aquí los datos reales; el resto de la web los usa.
// ============================================================
export const site = {
  name: '1492tokens',
  domain: 'https://1492tokens.com',
  contactEmail: 'pablo@pelaezaller.com',
  founder: 'Pablo Peláez',
  founderLinkedIn: 'https://www.linkedin.com/in/pablopela/', // ← revisar
  // Redes (dejar '' para ocultar el enlace)
  youtube: '',      // ej. 'https://www.youtube.com/@1492tokens'
  instagram: '',    // ej. 'https://www.instagram.com/1492tokens'
  tiktok: '',       // ej. 'https://www.tiktok.com/@1492tokens'
  linkedin: '',     // página de LinkedIn del proyecto
  // Luma
  lumaCalendarUrl: '',   // ej. 'https://lu.ma/1492tokens'  (calendario para suscribirse)
  lumaCalendarId: '',    // ej. 'cal-XXXXXXXX' (para el embed del calendario)
  // Formularios (Google Forms / Tally)
  speakerFormUrl: '',    // formulario "Quiero hablar"
  cityFormUrl: '',       // formulario "Traer 1492tokens a mi ciudad"
  newsletterAction: '',  // endpoint de tu herramienta de newsletter (Mailchimp, Brevo, Buttondown...)
};

// Próximo evento. Si no hay fecha confirmada, deja `date: null`.
export const nextEvent = {
  city: 'León',
  country: 'España',
  volume: 1,
  date: null as string | null,   // ej. '2026-10-23T19:00:00+02:00'
  venue: 'Por confirmar',
  address: '',
  lumaEventUrl: '',              // ej. 'https://lu.ma/abcd1234'
  lumaEventId: '',               // ej. 'evt-XXXXXXXX'
  capacityNote: '',              // ej. 'Aforo limitado a 60 plazas'
  speakers: [] as { name: string; talk: string; city?: string; linkedin?: string }[],
  talksPerEvent: 5,
};
