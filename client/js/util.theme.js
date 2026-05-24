// Theme utility functions
// 主题工具函数

// Theme data - premium dark cyberpunk gradients
// 主题数据 - 高级暗色赛博朋克渐变色
export const THEMES = [
	{
		id: 'theme1',
		background: 'radial-gradient(circle at top, rgba(0, 231, 255, 0.15), transparent 45%), radial-gradient(circle at bottom right, rgba(255, 51, 95, 0.12), transparent 35%), linear-gradient(180deg, #07101e 0%, #02060d 60%, #010308 100%)'
	},
	{
		id: 'theme2',
		background: 'radial-gradient(circle at top, rgba(189, 0, 255, 0.18), transparent 45%), radial-gradient(circle at bottom right, rgba(0, 231, 255, 0.12), transparent 35%), linear-gradient(180deg, #10071e 0%, #05020d 60%, #030108 100%)'
	},
	{
		id: 'theme3',
		background: 'radial-gradient(circle at top, rgba(0, 255, 102, 0.15), transparent 45%), radial-gradient(circle at bottom right, rgba(0, 231, 255, 0.1), transparent 35%), linear-gradient(180deg, #071e10 0%, #020d06 60%, #010803 100%)'
	},
	{
		id: 'theme4',
		background: 'radial-gradient(circle at top, rgba(255, 51, 95, 0.16), transparent 45%), radial-gradient(circle at bottom right, rgba(189, 0, 255, 0.1), transparent 35%), linear-gradient(180deg, #1e0710 0%, #0d0206 60%, #080103 100%)'
	},
	{
		id: 'theme5',
		background: 'radial-gradient(circle at top, rgba(255, 170, 0, 0.14), transparent 45%), radial-gradient(circle at bottom right, rgba(255, 51, 95, 0.1), transparent 35%), linear-gradient(180deg, #1e1207 0%, #0d0802 60%, #080501 100%)'
	},
	{
		id: 'theme6',
		background: 'radial-gradient(circle at top, rgba(0, 102, 255, 0.16), transparent 45%), radial-gradient(circle at bottom right, rgba(0, 231, 255, 0.1), transparent 35%), linear-gradient(180deg, #07121e 0%, #02080d 60%, #010508 100%)'
	},
	{
		id: 'theme7',
		background: 'radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 45%), radial-gradient(circle at bottom right, rgba(0, 231, 255, 0.06), transparent 35%), linear-gradient(180deg, #141b24 0%, #0b0f14 60%, #06090c 100%)'
	}
];

// Get current theme from settings
// 从设置中获取当前主题
export function getCurrentTheme() {
    try {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        
        // If no theme is set (first-time visitor), use theme1 as default
        // 如果没有设置主题（首次访问），使用 theme1 作为默认
        if (!settings.theme) {
            // Save theme1 as default theme to settings
            // 将 theme1 作为默认主题保存到设置中
            settings.theme = 'theme1';
            localStorage.setItem('settings', JSON.stringify(settings));
            
            return THEMES[0];
        }
        
        const themeId = settings.theme;
        return THEMES.find(theme => theme.id === themeId) || THEMES[0];
    } catch {
        // If there's an error, use theme1 as fallback
        // 如果出现错误，使用 theme1 作为备选
        return THEMES[0];
    }
}

// Apply theme to the document
// 应用主题到文档
export function applyTheme(themeId) {
	const theme = THEMES.find(t => t.id === themeId);
	if (!theme) {
		console.warn(`Theme with id "${themeId}" not found`);
		return false;
	}
	
	const mainElement = document.querySelector('.main');
	if (mainElement) {
		// Clear any existing background
		mainElement.style.backgroundImage = '';
		mainElement.style.background = '';
		
		// Apply new background
		if (theme.background.startsWith('url(')) {
			mainElement.style.backgroundImage = theme.background;
			mainElement.style.backgroundSize = '100% 100%';
			mainElement.style.backgroundRepeat = 'no-repeat';
			mainElement.style.backgroundPosition = 'center';
		} else {
			mainElement.style.background = theme.background;
		}

		// Add transition effect for smooth theme switching
		// 添加过渡效果，实现平滑的主题切换
		mainElement.style.transition = 'background 0.5s ease-in-out, background-image 0.5s ease-in-out';
		
		return true;
	} else {
		console.warn('Main element not found');
		return false;
	}
}

// Initialize theme on page load
// 页面加载时初始化主题
export function initTheme() {
	const currentTheme = getCurrentTheme();
	applyTheme(currentTheme.id);
}

// Get theme by ID
// 根据ID获取主题
export function getThemeById(themeId) {
	return THEMES.find(theme => theme.id === themeId);
}

// Get all available themes
// 获取所有可用主题
export function getAllThemes() {
	return THEMES;
}
