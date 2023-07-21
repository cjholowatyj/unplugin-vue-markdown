import type { Options, ResolvedOptions } from './types'
import { getVueVersion, isUnheadVueInstalled } from './utils'

export function resolveOptions(userOptions: Options): ResolvedOptions {
  const defaultOptions: ResolvedOptions = {
    headEnabled: false,
    headField: '',
    frontmatter: true,
    excerpt: false,
    exposeFrontmatter: true,
    exposeExcerpt: false,
    exportFontmatter: true,
    escapeCodeTagInterpolation: true,
    customSfcBlocks: ['route', 'i18n', 'style'],
    componentOptions: {},
    frontmatterOptions: {},
    markdownItOptions: {},
    markdownItUses: [],
    markdownItSetup: () => {},
    wrapperComponent: null,
    transforms: {},
    vueVersion: userOptions.vueVersion || getVueVersion(),
    wrapperClasses: 'markdown-body',
    include: null,
    exclude: null,
    frontmatterPreprocess: (frontmatter, options, _id, defaults) => {
      return {
        head: defaults(frontmatter, options),
        frontmatter,
      }
    },
  }

  const options = {
    ...defaultOptions,
    ...userOptions,
  }

  if (options.headEnabled === true)
    options.headEnabled = isUnheadVueInstalled() ? 'unhead' : 'vueuse'

  return options as ResolvedOptions
}
