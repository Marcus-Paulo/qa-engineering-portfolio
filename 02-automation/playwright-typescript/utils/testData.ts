export function generateValidCpf(): string {
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const calculateDigit = (numbers: number[], factor: number): number => {
    const sum = numbers.reduce((total, digit) => total + digit * factor--, 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  digits.push(calculateDigit(digits, 10));
  digits.push(calculateDigit(digits, 11));

  return digits.join('');
}

export function uniquePersonData() {
  const suffix = Date.now();

  return {
    name: `Pessoa Teste ${suffix}`,
    cpf: generateValidCpf(),
    email: `qa.teste.${suffix}@example.com`,
  };
}
