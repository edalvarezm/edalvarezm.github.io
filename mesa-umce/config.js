// Conexión con Supabase (proyecto "mesa-juicios-umce"). Estos dos datos son públicos por diseño:
// la seguridad la dan las reglas de la base de datos. NUNCA ponga aquí la "secret key".
window.MESA_CONFIG = {
  institucion: 'UMCE',  // sigla que se muestra en el ingreso, la barra y el título; separa también los datos locales del navegador
  institucionNombre: 'Universidad Metropolitana de Ciencias de la Educación',
  color: '#03BF6A',  // color de la sigla junto al título (paleta de la asesoría)
  url: 'https://kcntgajffnspgqvxywjf.supabase.co',
  key: 'sb_publishable_qzRjZe-oyTakL-DQyzjtCw_myGaz5-e',
  maxArchivoMB: 50,  // plan gratuito: 50 MB por archivo. Al pasar a Pro puede subirse (ej.: 2048)
  dominioUsuarios: 'ealvarez.cl'  // "carolina.ulloa.umce" se convierte en carolina.ulloa.umce@ealvarez.cl al ingresar
};
