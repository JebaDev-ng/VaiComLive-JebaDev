# Design Document

## Overview

This design document outlines the approach to resolve security vulnerabilities in the Vai Com Live project by upgrading Vite from version 5.4.19 to 7.1.11. The upgrade addresses a moderate-severity vulnerability in esbuild (GHSA-67mh-4wv8-2f99) that allows unauthorized requests to the development server.

The upgrade path involves two major version jumps (5 → 6 → 7), requiring careful attention to breaking changes and compatibility issues. This design follows a systematic approach: research breaking changes, update dependencies, modify configurations, and validate functionality.

## Architecture

### Current State

- **Vite Version**: 5.4.19
- **esbuild Version**: ≤0.24.2 (vulnerable)
- **Node.js Requirement**: 18+ (current)
- **Build Target**: 'modules' (Vite 5 default)
- **Plugins**: @vitejs/plugin-react-swc (3.11.0), vite-plugin-svgr (4.5.0)

### Target State

- **Vite Version**: 7.1.11+
- **esbuild Version**: >0.24.2 (patched)
- **Node.js Requirement**: 20.19+ / 22.12+ (Vite 7 requirement)
- **Build Target**: 'baseline-widely-available' (Vite 7 default)
- **Plugins**: Compatible versions with Vite 7.x

### Migration Path

```
Vite 5.4.19 → Vite 6.x → Vite 7.1.11
```

This two-step migration ensures we address all breaking changes systematically.

## Components and Interfaces

### 1. Dependency Updates

#### Primary Dependencies

- **vite**: 5.4.19 → 7.1.11
  - Major version upgrade with breaking changes
  - Includes esbuild security patch
  - Requires Node.js 20.19+

#### Plugin Compatibility

- **@vitejs/plugin-react-swc**: 3.11.0 → Check compatibility with Vite 7
  - Used for React Fast Refresh with SWC
  - Critical for development experience
  
- **vite-plugin-svgr**: 4.5.0 → Check compatibility with Vite 7
  - Used for SVG-as-React-component imports
  - Heavily used in the project (Assets folder)

### 2. Configuration Changes

#### vite.config.ts Updates

Based on Vite 6 and 7 migration guides, the following changes may be required:

**Vite 6 Breaking Changes:**
- `resolve.conditions` default value changed
- `json.stringify` behavior changed (now 'auto' by default)
- Sass modern API is now default
- CSS output file naming in library mode changed
- `build.cssMinify` enabled by default for SSR

**Vite 7 Breaking Changes:**
- Node.js 20.19+ / 22.12+ required
- Browser target updated (Chrome 87→107, Firefox 78→104, Safari 14→16)
- 'modules' target removed, replaced with 'baseline-widely-available'
- Sass legacy API support removed completely
- splitVendorChunkPlugin removed

**Current Configuration Analysis:**
```typescript
// Current vite.config.ts structure
- server.host: "::" (IPv6)
- server.port: 8080
- plugins: react(), svgr(), componentTagger()
- resolve.alias: "@" → "./src"
```

**Expected Changes:**
- No explicit `resolve.conditions` → Should work with new defaults
- No `json.stringify` configuration → Will use new 'auto' default
- No Sass configuration → Not affected
- No library mode → CSS naming changes don't apply
- Plugin compatibility needs verification

### 3. Node.js Version Verification

Vite 7 requires Node.js 20.19+ or 22.12+. The upgrade process must:
1. Check current Node.js version
2. Document if upgrade is needed
3. Provide guidance for Node.js upgrade if necessary

## Data Models

### Vulnerability Report Structure

```typescript
interface VulnerabilityReport {
  package: string;           // "esbuild"
  severity: string;          // "moderate"
  cvss: number;             // 5.3
  cve: string;              // "GHSA-67mh-4wv8-2f99"
  affectedVersions: string; // "<=0.24.2"
  fixedVersion: string;     // ">0.24.2"
  via: string[];            // ["vite"]
}
```

### Compatibility Matrix

```typescript
interface CompatibilityCheck {
  package: string;
  currentVersion: string;
  targetVersion: string;
  compatible: boolean;
  requiresUpdate: boolean;
  notes: string;
}
```

## Error Handling

### Potential Issues and Mitigation

#### 1. Node.js Version Incompatibility

**Issue**: User's Node.js version < 20.19
**Detection**: Check `process.version` before upgrade
**Mitigation**: 
- Provide clear error message
- Link to Node.js download page
- Document version requirement

#### 2. Plugin Incompatibility

**Issue**: Plugins not compatible with Vite 7
**Detection**: Run `npm install` and check for peer dependency warnings
**Mitigation**:
- Update plugins to compatible versions
- Find alternative plugins if needed
- Document plugin changes

#### 3. Build Configuration Errors

**Issue**: Breaking changes in Vite config API
**Detection**: Run `npm run build` and check for errors
**Mitigation**:
- Update config based on migration guides
- Test each configuration change
- Maintain backward compatibility where possible

#### 4. Runtime Errors

**Issue**: Application fails at runtime after upgrade
**Detection**: Run dev server and test all pages
**Mitigation**:
- Test all routes systematically
- Check browser console for errors
- Verify HMR functionality

#### 5. SVG Import Failures

**Issue**: vite-plugin-svgr may have compatibility issues
**Detection**: Test SVG imports in components
**Mitigation**:
- Update vite-plugin-svgr if needed
- Verify SVGR configuration compatibility
- Test SVG rendering in all sections

## Testing Strategy

### Phase 1: Pre-Upgrade Validation

1. **Environment Check**
   - Verify Node.js version (≥20.19 or ≥22.12)
   - Document current npm/pnpm version
   - Backup package-lock.json

2. **Baseline Testing**
   - Run `npm run dev` - verify server starts
   - Run `npm run build` - verify build succeeds
   - Run `npm run lint` - verify no lint errors
   - Document current behavior

### Phase 2: Dependency Upgrade

1. **Update Vite**
   - Update vite to 7.1.11 in package.json
   - Run `npm install`
   - Check for peer dependency warnings

2. **Update Plugins**
   - Check @vitejs/plugin-react-swc compatibility
   - Check vite-plugin-svgr compatibility
   - Update if necessary

3. **Resolve Conflicts**
   - Address any peer dependency conflicts
   - Update related packages if needed

### Phase 3: Configuration Updates

1. **Review vite.config.ts**
   - Check for deprecated options
   - Update based on migration guides
   - Verify plugin configurations

2. **Test Configuration**
   - Run `npm run dev` - check for config errors
   - Verify server starts on port 8080
   - Check HMR functionality

### Phase 4: Functional Testing

1. **Development Server Testing**
   - Start dev server: `npm run dev`
   - Test all routes: /, /bg-test, 404
   - Verify hot module replacement
   - Check browser console for errors

2. **Build Testing**
   - Production build: `npm run build`
   - Development build: `npm run build:dev`
   - Preview build: `npm run preview`
   - Verify no build errors

3. **Feature Testing**
   - Test language switching (PT/EN/ES)
   - Test all page sections (Hero, Objetivos, etc.)
   - Test SVG rendering (logos, icons)
   - Test animations (Framer Motion)
   - Test responsive behavior
   - Test dark mode (next-themes)

4. **Lint Testing**
   - Run `npm run lint`
   - Verify ESLint still works
   - Check for new warnings

### Phase 5: Security Validation

1. **Vulnerability Scan**
   - Run `npm audit`
   - Verify zero moderate+ vulnerabilities
   - Confirm esbuild version >0.24.2

2. **Dependency Tree Check**
   - Run `npm list esbuild`
   - Verify no vulnerable versions in tree

### Phase 6: Documentation

1. **Create Changelog**
   - Document Vite version change
   - List configuration changes
   - Note any breaking changes encountered

2. **Update Documentation**
   - Update README if needed
   - Document Node.js requirement
   - Add migration notes

## Rollback Strategy

If critical issues are encountered:

1. **Immediate Rollback**
   ```bash
   git checkout package.json package-lock.json
   npm install
   ```

2. **Partial Rollback**
   - Revert specific configuration changes
   - Keep compatible plugin updates
   - Document issues for future attempts

3. **Alternative Approach**
   - Consider Vite 6.x as intermediate step
   - Update plugins first, then Vite
   - Seek community solutions for specific issues

## Performance Considerations

### Expected Improvements

- **Faster Builds**: Vite 7 includes performance optimizations
- **Better HMR**: Improved hot module replacement
- **Smaller Bundles**: Updated esbuild with better tree-shaking

### Potential Regressions

- **Initial Build Time**: First build after upgrade may be slower (cache rebuild)
- **Plugin Overhead**: Updated plugins may have different performance characteristics

## Security Considerations

### Vulnerability Details

- **CVE**: GHSA-67mh-4wv8-2f99
- **Severity**: Moderate (CVSS 5.3)
- **Attack Vector**: Network (AV:N)
- **Attack Complexity**: High (AC:H)
- **Impact**: Confidentiality High (C:H)
- **Description**: esbuild enables any website to send requests to the development server and read responses

### Risk Assessment

- **Current Risk**: Development server vulnerable to cross-site attacks
- **Mitigation**: Upgrade to Vite 7.1.11 (includes esbuild >0.24.2)
- **Residual Risk**: None (vulnerability fully patched)

### Best Practices

- Keep dependencies updated regularly
- Run `npm audit` in CI/CD pipeline
- Monitor security advisories for critical dependencies
- Use `npm audit fix` for automated patches when safe

## Dependencies and Constraints

### Hard Requirements

- Node.js 20.19+ or 22.12+ (Vite 7 requirement)
- npm 8+ or compatible package manager
- Windows environment compatibility

### Soft Requirements

- Maintain development workflow
- Preserve all existing features
- No user-facing changes
- Minimal configuration changes

### External Dependencies

- Vite project maintainers (for documentation)
- Plugin maintainers (for compatibility)
- Node.js project (for runtime)

## Implementation Phases

### Phase 1: Preparation (Requirements 1, 3)
- Check Node.js version
- Review migration guides
- Backup current state

### Phase 2: Dependency Updates (Requirements 1, 2, 5)
- Update Vite to 7.1.11
- Update plugins if needed
- Resolve dependency conflicts

### Phase 3: Configuration (Requirement 3)
- Update vite.config.ts if needed
- Test configuration changes
- Verify plugin compatibility

### Phase 4: Validation (Requirements 2, 4, 5)
- Test development server
- Test build process
- Test all features
- Run security audit

### Phase 5: Documentation (Requirement 6)
- Create changelog
- Document changes
- Update team documentation
