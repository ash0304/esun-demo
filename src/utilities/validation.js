import * as yup from 'yup';
import { defineRule, configure } from 'vee-validate';
import { required, length, max, min, digits } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

const REQUIRED_MSG = '請填寫此欄位';

function arrayRequired() {
  return this.min(1, REQUIRED_MSG);
}
defineRule('required', required);
defineRule('length', length);
defineRule('max', max);
defineRule('min', min);
defineRule('digits', digits);
// 統一編號規則
defineRule('uniNumbers', (value) => {
  // 非必填(若要必填另外套用require規則)
  if (!value || !value.length) {
    return true;
  }

  const regx = /[0-9A-Za-z]{10,10}/;
  if (!regx.test(value)) {
    return '請輸入10碼英數字';
  }
  return true;
});

configure({
  // Generates an English message locale generator
  generateMessage: localize('zh_TW', {
    messages: {
      required: '請填寫此欄位',
      max: (context) => `長度限制${context.rule.params}碼`,
      min: (context) => `長度限制${context.rule.params}碼`,
      length: (context) => `長度限制${context.rule.params}碼`,
      digits: (context) => `長度限制${context.rule.params}碼數字`,
    },
  }),
});

yup.addMethod(yup.array, 'arrayRequired', arrayRequired);
yup.setLocale({
  mixed: {
    required: REQUIRED_MSG,
  },
});
