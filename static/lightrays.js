import { Renderer, Program, Mesh, Triangle } from 'https://cdn.jsdelivr.net/npm/ogl@1.0.11/dist/ogl.mjs';

function initLightRays() {
  const container = document.getElementById('reactbits-lightrays');
  if (!container) return;

  const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
  const gl = renderer.gl;
  container.appendChild(gl.canvas);
  gl.clearColor(0, 0, 0, 0);

  const vert = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }`;

  const frag = `
    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec2 rayPos;
    uniform vec2 rayDir;
    uniform vec3 raysColor;
    uniform float raysSpeed;
    uniform float lightSpread;
    uniform float rayLength;
    uniform float pulsating;
    uniform float fadeDistance;
    uniform float saturation;
    uniform vec2  mousePos;
    uniform float mouseInfluence;
    uniform float noiseAmount;
    uniform float distortion;

    varying vec2 vUv;

    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
      vec2 sourceToCoord = coord - raySource;
      vec2 dirNorm = normalize(sourceToCoord);
      float cosAngle = dot(dirNorm, rayRefDirection);

      float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
      
      float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

      float distance = length(sourceToCoord);
      float maxDistance = iResolution.x * rayLength;
      float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
      
      float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
      float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

      float baseStrength = clamp(
        (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
        (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
        0.0, 1.0
      );

      return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
      
      vec2 finalRayDir = rayDir;
      if (mouseInfluence > 0.0) {
        vec2 mouseScreenPos = mousePos * iResolution.xy;
        vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
        finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
      }

      vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
      vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

      fragColor = rays1 * 0.5 + rays2 * 0.4;

      if (noiseAmount > 0.0) {
        float n = noise(coord * 0.01 + iTime * 0.1);
        fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
      }

      float brightness = 1.0 - (coord.y / iResolution.y);
      fragColor.x *= 0.1 + brightness * 0.8;
      fragColor.y *= 0.3 + brightness * 0.6;
      fragColor.z *= 0.5 + brightness * 0.5;

      if (saturation != 1.0) {
        float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
        fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
      }

      fragColor.rgb *= raysColor * 2.0;
    }

    void main() {
      vec4 color;
      mainImage(color, gl_FragCoord.xy);
      gl_FragColor  = color;
    }`;

  // RadixArk Theme configuration (Hyper-Boosted Orange)
  const raysColor = [3.5, 1.2, 0.4];
  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: [1, 1] },
    rayPos: { value: [0, 0] },
    rayDir: { value: [0, 1] },
    raysColor: { value: raysColor },
    raysSpeed: { value: 2.0 },
    lightSpread: { value: 0.8 },
    rayLength: { value: 0.8 },
    pulsating: { value: 1.0 },
    fadeDistance: { value: 0.5 },
    saturation: { value: 1.5 },
    mousePos: { value: [0.5, 0.5] },
    mouseInfluence: { value: 0.0 }, // Disabled for static header
    noiseAmount: { value: 0.05 },
    distortion: { value: 0.6 }
  };

  const geometry = new Triangle(gl);
  const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
  const mesh = new Mesh(gl, { geometry, program });

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    uniforms.iResolution.value = [w * dpr, h * dpr];
    
    // Top origin anchor mapping
    uniforms.rayPos.value = [w * dpr * 0.5, 0];
    uniforms.rayDir.value = [0, 1];
  }

  window.addEventListener('resize', resize);
  resize();

  function update(t) {
    requestAnimationFrame(update);
    uniforms.iTime.value = t * 0.001;
    renderer.render({ scene: mesh });
  }
  requestAnimationFrame(update);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightRays);
} else {
  // DOM is already parsed, run immediately.
  initLightRays();
}
