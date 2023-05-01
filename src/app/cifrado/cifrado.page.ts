import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cifrado',
  templateUrl: './cifrado.page.html',
  styleUrls: ['./cifrado.page.scss'],
})
export class CifradoPage {
  // Forms
  public generarClavesForm = new FormGroup({
    clave: new FormControl('', Validators.required),
    subclaveK1: new FormControl(),
    subclaveK2: new FormControl(),
  });

  public cifradoForm: FormGroup = new FormGroup({
    textoClaroInput: new FormControl('', Validators.required),
    textoCifradoOutput: new FormControl(),
  });

  public descifradoForm: FormGroup = new FormGroup({
    textoCifradoInput: new FormControl('', Validators.required),
    textoClaroOutput: new FormControl(),
  });

  constructor() {}

  calcularClave(): void {
    // Segmenta la clave en bits individuales.
    const clave: number[] = this.generarClavesForm
      .get('clave')
      ?.value?.toString()
      .split('')
      .map((array: string) => +array)!;

    // Verificar que el vector tenga la cantidad correcta de bits
    const claveVerificada = this.verificarVector(clave, 10);

    // Realiza la P10
    const vectorP10: number[] = this.permutar10(claveVerificada);

    // Divide el vector en dos
    const [vectorL, vectorR] = this.splitEnDos(vectorP10);

    // Corrimiento circular a la izquierda
    const vectorLCl1: number[] = this.corrimientoCircularIzquierda(vectorL);
    const vectorRCl1: number[] = this.corrimientoCircularIzquierda(vectorR);

    // Se concatenan los bloques
    const vectorLRK1: number[] = this.concatenarBloques(vectorLCl1, vectorRCl1);

    // Se aplica la P8
    const claveK1: number[] = this.permutar8(vectorLRK1);

    // Muestra en pantalla la clave K1
    this.generarClavesForm.get('subclaveK1')?.patchValue(claveK1.join(''));

    // Corrimiento circular de dos posiciones
    let vectorLCl2: number[] = this.corrimientoCircularIzquierda(vectorLCl1);
    vectorLCl2 = this.corrimientoCircularIzquierda(vectorLCl2);
    let vectorRCl2: number[] = this.corrimientoCircularIzquierda(vectorRCl1);
    vectorRCl2 = this.corrimientoCircularIzquierda(vectorRCl2);

    // Se concatenan los bloques
    const vectorLRK2: number[] = this.concatenarBloques(vectorLCl2, vectorRCl2);

    // Se aplica la P8
    const claveK2: number[] = this.permutar8(vectorLRK2);

    // Muestra en pantalla la clave K2
    this.generarClavesForm.get('subclaveK2')?.patchValue(claveK2.join(''));

    // Logs en consola
    // console.log('clave ', clave);
    // console.log('vectorP10 ', vectorP10);
    // console.log('vectorL ', vectorL);
    // console.log('vectorR ', vectorR);
    // console.log('vectorLCl1 ', vectorLCl1);
    // console.log('vectorRCl1 ', vectorRCl1);
    // console.log('vectorLRK1 ', vectorLRK1);
    // console.log('claveK1 ', claveK1);
    // console.log('vectorLCl2 ', vectorLCl2);
    // console.log('vectorRCl2 ', vectorRCl2);
    // console.log('vectorLRK2 ', vectorLRK2);
    // console.log('claveK2 ', claveK2);
  }

  cifrar() {
    // Segmenta el mensaje en bits individuales.
    const textoClaroInput: number[] = this.cifradoForm
      .get('textoClaroInput')
      ?.value?.toString()
      .split('')
      .map((array: string) => +array);

    // Verificar que el vector tenga la cantidad correcta de bits
    const textoClaroVerificado = this.verificarVector(textoClaroInput, 8);

    // Aplica la IP
    const vectorIP: number[] = this.permutarIP(textoClaroVerificado);

    // Lee la subclave k1 y k2 para usarlas dentro de fx
    const claveK1: number[] = this.generarClavesForm
      .get('subclaveK1')
      ?.value?.toString()
      .split('')
      .map((array: string) => +array);

    const claveK2: number[] = this.generarClavesForm
      .get('subclaveK2')
      ?.value?.toString()
      .split('')
      .map((array: string) => +array);

    // Calcula la fx con IP y la clave K1
    const fxK1 = this.funcionFx(vectorIP, claveK1);

    // Hace el swap del resultado de fx con K1
    const fxSwap = this.swap(fxK1);

    // Calcula la fx con fxSwap y K2
    const fxK2 = this.funcionFx(fxSwap, claveK2);

    // Aplica la IP Inversa a fxK2
    const mensajeCifrado = this.permutarIPInversa(fxK2);

    // Muestra en pantalla el resultado como mensaje cifrado
    this.cifradoForm
      .get('textoCifradoOutput')
      ?.patchValue(mensajeCifrado.join(''));

    // Logs en consola
    // console.log('textoClaroInput ', textoClaroInput);
    // console.log('vectorIP ', vectorIP);
    // console.log('claveK1 ', claveK1);
    // console.log('claveK2 ', claveK2);
    // console.log('fxK1 ', fxK1);
    // console.log('fxSwap ', fxSwap);
    // console.log('fxK2 ', fxK2);
    // console.log('mensajeCifrado ', mensajeCifrado);
  }

  descifrar() {
    // Segmenta el mensaje en bits individuales.
    const textoCifradoInput: number[] = this.descifradoForm
      .get('textoCifradoInput')
      ?.value?.toString()
      .split('')
      .map((array: string) => +array);

    // Verificar que el vector tenga la cantidad correcta de bits
    const textoCifradoVerificado = this.verificarVector(textoCifradoInput, 8);

    // Aplica la IP
    const vectorIP: number[] = this.permutarIP(textoCifradoVerificado);

    // Lee la subclave k1 y k2 para usarlas dentro de fx
    const claveK1: number[] = this.generarClavesForm
      .get('subclaveK1')
      ?.value?.toString()
      .split('')
      .map((array: string) => +array);

    const claveK2: number[] = this.generarClavesForm
      .get('subclaveK2')
      ?.value?.toString()
      .split('')
      .map((array: string) => +array);

    // Calcula la fx con IP y la clave K2
    const fxK2 = this.funcionFx(vectorIP, claveK2);

    // Hace el swap del resultado de fx con K1
    const fxSwap = this.swap(fxK2);

    // Calcula la fx con fxSwap y K2
    const fxK1 = this.funcionFx(fxSwap, claveK1);

    // Aplica la IP Inversa a fxK2
    const mensajeClaro = this.permutarIPInversa(fxK1);

    // Muestra en pantalla el resultado como mensaje cifrado
    this.descifradoForm
      .get('textoClaroOutput')
      ?.patchValue(mensajeClaro.join(''));

    // Logs en consola
    console.log('textoCifradoInput ', textoCifradoInput);
    console.log('vectorIP ', vectorIP);
    console.log('claveK1 ', claveK1);
    console.log('claveK2 ', claveK2);
    console.log('fxK1 ', fxK1);
    console.log('fxSwap ', fxSwap);
    console.log('fxK2 ', fxK2);
    console.log('mensajeClaro ', mensajeClaro);
  }

  permutar10(vector: number[]): number[] {
    const p10 = [];

    p10.push(vector[3 - 1]);
    p10.push(vector[5 - 1]);
    p10.push(vector[2 - 1]);
    p10.push(vector[7 - 1]);
    p10.push(vector[4 - 1]);
    p10.push(vector[10 - 1]);
    p10.push(vector[1 - 1]);
    p10.push(vector[9 - 1]);
    p10.push(vector[8 - 1]);
    p10.push(vector[6 - 1]);

    return p10;
  }

  splitEnDos(vector: number[]): number[][] {
    const mitad = vector.length / 2;
    return [vector.slice(0, mitad), vector.slice(mitad, mitad * 2)];
  }

  corrimientoCircularIzquierda([...vector]: number[]): number[] {
    const temporal = vector.shift()!;
    vector.push(temporal);
    return vector;
  }

  concatenarBloques(bloqueL: number[], bloqueR: number[]): number[] {
    return [...bloqueL, ...bloqueR];
  }

  permutar8(vector: number[]): number[] {
    const p8 = [];

    p8.push(vector[6 - 1]);
    p8.push(vector[3 - 1]);
    p8.push(vector[7 - 1]);
    p8.push(vector[4 - 1]);
    p8.push(vector[8 - 1]);
    p8.push(vector[5 - 1]);
    p8.push(vector[10 - 1]);
    p8.push(vector[9 - 1]);

    return p8;
  }

  permutarIP(vector: number[]): number[] {
    const ip = [];

    ip.push(vector[2 - 1]);
    ip.push(vector[6 - 1]);
    ip.push(vector[3 - 1]);
    ip.push(vector[1 - 1]);
    ip.push(vector[4 - 1]);
    ip.push(vector[8 - 1]);
    ip.push(vector[5 - 1]);
    ip.push(vector[7 - 1]);

    return ip;
  }

  permutarIPInversa(vector: number[]): number[] {
    const ipInversa = [];

    ipInversa.push(vector[4 - 1]);
    ipInversa.push(vector[1 - 1]);
    ipInversa.push(vector[3 - 1]);
    ipInversa.push(vector[5 - 1]);
    ipInversa.push(vector[7 - 1]);
    ipInversa.push(vector[2 - 1]);
    ipInversa.push(vector[8 - 1]);
    ipInversa.push(vector[6 - 1]);

    return ipInversa;
  }

  permutarExpansion(vector: number[]): number[] {
    const ep = [];

    ep.push(vector[4 - 1]);
    ep.push(vector[1 - 1]);
    ep.push(vector[2 - 1]);
    ep.push(vector[3 - 1]);
    ep.push(vector[2 - 1]);
    ep.push(vector[3 - 1]);
    ep.push(vector[4 - 1]);
    ep.push(vector[1 - 1]);

    return ep;
  }

  xor(vector: number[], clave: number[]): number[] {
    const resultado = [];

    for (let i = 0; i < vector.length; i++) {
      resultado.push(vector[i] ^ clave[i]);
    }
    return resultado;
  }

  buscarEnS0(vector: number[]): number[] {
    const fila = vector[0] * 2 + vector[3];
    const columna = vector[1] * 2 + vector[2];
    const matrizS0: number[][][] = [
      [
        [0, 1],
        [0, 0],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1],
        [1, 0],
        [0, 1],
        [0, 0],
      ],
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ];
    return matrizS0[fila][columna];
  }

  buscarEnS1(vector: number[]): number[] {
    const fila = vector[0] * 2 + vector[3];
    const columna = vector[1] * 2 + vector[2];
    const matrizS1: number[][][] = [
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 0],
        [0, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [0, 0],
        [0, 1],
        [0, 0],
      ],
      [
        [1, 0],
        [0, 1],
        [0, 0],
        [1, 1],
      ],
    ];
    return matrizS1[fila][columna];
  }

  permutar4(vector: number[]): number[] {
    const p4 = [];

    p4.push(vector[2 - 1]);
    p4.push(vector[4 - 1]);
    p4.push(vector[3 - 1]);
    p4.push(vector[1 - 1]);

    return p4;
  }

  funcionFx(vector: number[], subclave: number[]): number[] {
    // Divide el vector en dos
    const [vectorL, vectorR] = this.splitEnDos(vector);

    // Aplica la E/P
    const vectorEP = this.permutarExpansion(vectorR);

    // Operación XOR vectorEP con la subclave
    const xorEpClave = this.xor(vectorEP, subclave);

    // Se hace split antes de buscar los datos en tabla
    const [xorEpClaveS0, xorEpClaveS1] = this.splitEnDos(xorEpClave);

    // Hace los lookups para cada tabla
    const s0 = this.buscarEnS0(xorEpClaveS0);
    const s1 = this.buscarEnS1(xorEpClaveS1);

    // Concatena los resultados de s0 y s1
    const bloqueS = this.concatenarBloques(s0, s1);

    // Aplica la p4
    const vectorP4 = this.permutar4(bloqueS);

    // XOR entre el resultado de la P4 y vectorL
    const xorP4L = this.xor(vectorL, vectorP4);

    // Resultado de la función fx
    const fx = this.concatenarBloques(xorP4L, vectorR);

    // Logs en consola
    // console.log('vectorL ', vectorL);
    // console.log('vectorR ', vectorR);
    // console.log('vectorEP ', vectorEP);
    // console.log('xorEpClave ', xorEpClave);
    // console.log('xorEpClaveS0 ', xorEpClaveS0);
    // console.log('xorEpClaveS1 ', xorEpClaveS1);
    // console.log('S0 ', s0);
    // console.log('S1 ', s1);
    // console.log('bloqueS ', bloqueS);
    // console.log('vectorP4 ', vectorP4);
    // console.log('xorP4L ', xorP4L);

    return fx;
  }

  swap(vector: number[]): number[] {
    const [vectorL, vectorR] = this.splitEnDos(vector);
    return [...vectorR, ...vectorL];
  }

  verificarVector(vector: number[], longitudEsperada: number): number[] {
    if (vector.length === longitudEsperada) {
      return [...vector];
    } else {
      const numeroCeros = longitudEsperada - vector.length;
      const vectorAjustado = [...vector];
      for (let i = 0; i < numeroCeros; i++) {
        vectorAjustado.unshift(0);
      }

      return vectorAjustado;
    }
  }
}
