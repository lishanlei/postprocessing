import { NoBlending, ShaderMaterial, Uniform, Vector4 } from "three";

import fragmentShader from "./glsl/convolution/kawase.frag";
import vertexShader from "./glsl/convolution/kawase.vert";

/**
 * An optimized convolution shader material.
 *
 * Based on the GDC2003 Presentation by Masaki Kawase, Bunkasha Games:
 *  Frame Buffer Postprocessing Effects in DOUBLE-S.T.E.A.L (Wreckless)
 * and an article by Filip Strugar, Intel:
 *  An investigation of fast real-time GPU-based image blur algorithms
 *
 * Further modified according to Apple's [Best Practices for Shaders](https://goo.gl/lmRoM5).
 *
 * @todo Remove dithering code from fragment shader.
 * @implements {Resizable}
 */

export class KawaseBlurMaterial extends ShaderMaterial {

	/**
	 * Constructs a new convolution material.
	 *
	 * TODO Remove texelSize param.
	 * @param {Vector4} [texelSize] - Deprecated.
	 */

	constructor(texelSize = new Vector4()) {

		super({
			name: "KawaseBlurMaterial",
			uniforms: {
				inputBuffer: new Uniform(null),
				texelSize: new Uniform(new Vector4()),
				kernel: new Uniform(0.0),
				scale: new Uniform(1.0)
			},
			blending: NoBlending,
			depthWrite: false,
			depthTest: false,
			fragmentShader,
			vertexShader
		});

		/** @ignore */
		this.toneMapped = false;

		this.setTexelSize(texelSize.x, texelSize.y);

	}

	/**
	 * The input buffer.
	 *
	 * @type {Texture}
	 */

	set inputBuffer(value) {

		this.uniforms.inputBuffer.value = value;

	}

	/**
	 * Sets the input buffer.
	 *
	 * @deprecated Use inputBuffer instead.
	 * @param {Texture} value - The input buffer.
	 */

	setInputBuffer(value) {

		this.inputBuffer = value;

	}

	/**
	 * The blur scale.
	 *
	 * @type {Number}
	 */

	get scale() {

		return this.uniforms.scale.value;

	}

	set scale(value) {

		this.uniforms.scale.value = value;

	}

	/**
	 * Returns the blur scale.
	 *
	 * @deprecated Use scale instead.
	 * @return {Number} The scale.
	 */

	getScale() {

		return this.uniforms.scale.value;

	}

	/**
	 * Sets the blur scale.
	 *
	 * @deprecated Use scale instead.
	 * @return {Number} value - The scale.
	 */

	setScale(value) {

		this.uniforms.scale.value = value;

	}

	/**
	 * Returns the kernel.
	 *
	 * @return {Float32Array} The kernel.
	 * @deprecated Implementation detail, removed with no replacement.
	 */

	getKernel() {

		return null;

	}

	/**
	 * The current kernel.
	 *
	 * @type {Number}
	 */

	get kernel() {

		return this.uniforms.kernel.value;

	}

	set kernel(value) {

		this.uniforms.kernel.value = value;

	}

	/**
	 * Sets the current kernel.
	 *
	 * @deprecated Use kernel instead.
	 * @param {Number} value - The kernel.
	 */

	setKernel(value) {

		this.kernel = value;

	}

	/**
	 * Sets the texel size.
	 *
	 * @deprecated Use setSize() instead.
	 * @param {Number} x - The texel width.
	 * @param {Number} y - The texel height.
	 */

	setTexelSize(x, y) {

		this.uniforms.texelSize.value.set(x, y, x * 0.5, y * 0.5);

	}

	/**
	 * Sets the size of this object.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setSize(width, height) {

		const x = 1.0 / width, y = 1.0 / height;
		this.uniforms.texelSize.value.set(x, y, x * 0.5, y * 0.5);

	}

}
