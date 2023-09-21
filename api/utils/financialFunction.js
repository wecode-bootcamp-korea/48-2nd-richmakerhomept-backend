
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
      throw error; 
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
      throw error; 
    }
  };

const calculateConsumptionRate = (data) => {
    try {
      if (!Array.isArray(data) || data.length < 2) {
        throw new Error("데이터 배열은 최소한 2개의 요소가 있어야 합니다.");
      }
  
      var consumptionRate = [];
  
      for (var i = 1; i < data.length; i++) {
        const diff = data[i] - data[i - 1]; 
        const rateOfChange = (diff / data[i - 1]) * 100; 
        consumptionRate.push(rateOfChange);
      }
  
      return consumptionRate;
    } catch (error) {
      console.error(error.message);
      return data; 
    }
  };

const compoundInterest = (principal, rate, years) => {
    try{
        
        const annualRate = rate / 100;
    
        const n = 1;
        const t = years;
    
        const amount = principal * Math.pow(1 + annualRate / n, n * t);
    
        return amount.toFixed(2); 

    } catch (error) {
      console.error("오류 발생:", error.message);
      throw error; 
    }
  };
