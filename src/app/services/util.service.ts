export class UtilService{
  isNullOrUnderfinedOrEmpty = function(value){
    if(value !== null && value !== undefined && value !== ''){
      return false;
    }else{
      return true;
    }
  }

  isCityFormatCorrect = function(value: string){
    return value.length > 2 && value.length <= 15;
  }
}