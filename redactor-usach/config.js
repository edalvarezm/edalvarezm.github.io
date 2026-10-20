// REDACTOR | USACH. Conexión con Supabase (proyecto "redactor-usach", antes "mesa-juicios"). Estos dos datos son públicos por diseño:
// la seguridad la dan las reglas de la base de datos. NUNCA ponga aquí la "secret key".
window.MESA_CONFIG = {
  institucion: 'USACH',  // sigla que se muestra en el ingreso, la barra y el título; separa también los datos locales del navegador
  institucionNombre: 'Universidad de Santiago de Chile',
  color: '#FF6647',  // color de la sigla junto al título (paleta de la asesoría)
  url: 'https://cctbsbfmyfajnizbgkts.supabase.co',
  key: 'sb_publishable_-zyZYK4ddLvQ-jXtdOZ4Ew_4JhTkoyc',
  maxArchivoMB: 50,  // plan gratuito: 50 MB por archivo. Al pasar a Pro puede subirse (ej.: 2048)
  dominioUsuarios: 'ealvarez.cl'  // "usuario01" se convierte en usuario01@ealvarez.cl al ingresar
};
