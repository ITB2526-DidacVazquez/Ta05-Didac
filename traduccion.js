const traducciones = {
    "es": { "inicio": "Inicio", "contacto": "Contacto", "proy1": "Proyecto 1 (Ver)", "proy2": "Proyecto 2 (Ver)", "dudas": "¿Tienes dudas?" },
    "en": { "inicio": "Home", "contacto": "Contact", "proy1": "Project 1 (View)", "proy2": "Project 2 (View)", "dudas": "Any questions?" },
    "ca": { "inicio": "Inici", "contacto": "Contacte", "proy1": "Projecte 1 (Veure)", "proy2": "Projecte 2 (Veure)", "dudas": "Tens dubtes?" },
    "gl": { "inicio": "Inicio", "contacto": "Contacto", "proy1": "Proxecto 1 (Ver)", "proy2": "Proxecto 2 (Ver)", "dudas": "Tes dúbidas?" },
    "it": { "inicio": "Inizio", "contacto": "Contatto", "proy1": "Progetto 1 (Vedi)", "proy2": "Progetto 2 (Vedi)", "dudas": "Hai domande?" },
    "de": { "inicio": "Startseite", "contacto": "Kontakt", "proy1": "Projekt 1 (Ansehen)", "proy2": "Projekt 2 (Ansehen)", "dudas": "Haben Sie Fragen?" },
    "zh": { "inicio": "首页", "contacto": "联系方式", "proy1": "项目 1 (查看)", "proy2": "项目 2 (查看)", "dudas": "有问题吗？" },
    "ja": { "inicio": "ホーム", "contacto": "お問い合わせ", "proy1": "プロジェクト 1 (見る)", "proy2": "プロジェクト 2 (見る)", "dudas": "質問がありますか？" },
    "ru": { "inicio": "Главная", "contacto": "Контакт", "proy1": "Проект 1 (Смотреть)", "proy2": "Проект 2 (Смотреть)", "dudas": "Есть вопросы?" },
    "ar": { "inicio": "الصفحة الرئيسية", "contacto": "اتصل بنا", "proy1": "المشروع 1 (عرض)", "proy2": "المشروع 2 (عرض)", "dudas": "هل لديك أسئلة؟" }
};

const selector = document.getElementById('language-selector');

selector.addEventListener('change', (e) => {
    const idioma = e.target.value;
    cambiarIdioma(idioma);
    
    // Ajuste especial para el Árabe (se lee de derecha a izquierda)
    if (idioma === 'ar') {
        document.body.style.direction = 'rtl';
    } else {
        document.body.style.direction = 'ltr';
    }
});

function cambiarIdioma(idioma) {
    const elementos = document.querySelectorAll('[data-key]');
    elementos.forEach(elemento => {
        const clave = elemento.getAttribute('data-key');
        if (traducciones[idioma][clave]) {
            elemento.innerText = traducciones[idioma][clave];
        }
    });
}
