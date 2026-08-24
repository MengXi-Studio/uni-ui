/**
 * 构建脚本
 */

import { execSync } from 'child_process'
import { copyFileSync, mkdirSync, rmSync } from 'fs'
import path from 'path'

console.log('🚀 开始构建 @mengxi/uni-ui...')

// 清理旧的 dist 目录
console.log('🧹 清理旧的 dist 目录...')
rmSync('dist', { recursive: true, force: true })

// 创建 dist 目录
console.log('📁 创建 dist 目录...')
mkdirSync('dist', { recursive: true })

// 执行 Rollup 打包
console.log('📦 执行 Rollup 打包...')
try {
	execSync('rollup --config rollup.config.ts --configPlugin typescript', {
		stdio: 'inherit'
	})
} catch (error) {
	console.error('❌ Rollup 打包失败')
	process.exit(1)
}

// 生成类型声明
console.log('📝 生成类型声明...')
try {
	execSync('tsc --emitDeclarationOnly --outDir dist/types', {
		stdio: 'inherit'
	})
} catch (error) {
	console.error('❌ 类型声明生成失败')
	process.exit(1)
}

// 复制 README 到 dist
console.log('📄 复制文档到 dist...')
copyFileSync('README.md', 'dist/README.md')

// 复制组件的 README 文件
console.log('📋 复制组件文档...')
const componentsDir = 'packages/components'
const distDocsDir = 'dist/docs/components'

try {
	mkdirSync(distDocsDir, { recursive: true })

	const baseComponents = ['mx-button', 'mx-input', 'mx-card', 'mx-icon', 'mx-loading']
	const businessComponents = ['mx-product-card', 'mx-user-info']

	;[...baseComponents, ...businessComponents].forEach(component => {
		const readmePath = path.join(componentsDir, component.includes('mx-') ? 'base' : 'business', component, 'README.md')
		try {
			copyFileSync(readmePath, path.join(distDocsDir, `${component}.md`))
		} catch (e) {
			// README 文件可能不存在，忽略错误
		}
	})
} catch (error) {
	console.warn('⚠️ 复制组件文档失败')
}

console.log('✅ 构建完成！')
console.log('📂 输出目录：dist/')
