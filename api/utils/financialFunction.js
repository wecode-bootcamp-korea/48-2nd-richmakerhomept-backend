
const sum = (numbers) => {
    try {
      if (!Array.isArray(numbers)) {
        throw new Error("입력값은 배열이어야 합니다.");
      }
  
      let sumResult = 0;
      for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] !== 'number') {
          throw new Error("배열의 모든 요소는 숫자여야 합니다.");
        }
        sumResult += numbers[i];
      }

      return sumResult;

    } catch (error) {
      console.error("오류 발생:", error.message);
      throw error; // 오류를 다시 throw하여 호출자에게 전달
    }
  };
  
const portionInPercentages = async (portionNumber, sumNumber) => {
    try {
        if (typeof numbers[i] !== 'number') {
          throw new Error("배열의 모든 요소는 숫자여야 합니다.");
        }
        const sumResult = await portionNumber/sumNumber;

      return sumResult;

    } catch (error) {
      console.error("오류 발생:", error.message);
      throw error; // 오류를 다시 throw하여 호출자에게 전달
    }
  };

const calculateConsumptionRate = (data) => {
    try {
      if (!Array.isArray(data) || data.length < 2) {
        throw new Error("데이터 배열은 최소한 2개의 요소가 있어야 합니다.");
      }
  
      var consumptionRate = [];
  
      for (var i = 1; i < data.length; i++) {
        const diff = data[i] - data[i - 1]; // 현재 시간 단계와 이전 시간 단계의 차이
        const rateOfChange = (diff / data[i - 1]) * 100; // 백분율로 변환
        consumptionRate.push(rateOfChange);
      }
  
      return consumptionRate;
    } catch (error) {
      console.error(error.message);
      return data; // 에러가 발생한 경우 데이터 반환
    }
  };

const compoundInterest = (principal, rate, years) => {
    try{
        // 연이율을 연간 이자율로 변환
        const annualRate = rate / 100;
    
        // 복리 계산식: A = P(1 + r/n)^(nt)
        
        const n = 1; // 연 1회로 가정
        const t = years;
    
        const amount = principal * Math.pow(1 + annualRate / n, n * t);
    
        return amount.toFixed(2); // 소수점 2자리까지 표시

    } catch (error) {
      console.error("오류 발생:", error.message);
      throw error; // 오류를 다시 throw하여 호출자에게 전달
    }
  };
