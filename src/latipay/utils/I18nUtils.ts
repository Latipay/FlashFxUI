import { useI18n } from "vue-i18n/index";
import i18n from "@/core/plugins/i18n";
import { NamedValue } from "@intlify/core-base";

export class I18nUtils {
  public static translate = (text, named: NamedValue | null = null) => {
    const { t, te } = useI18n();
    return I18nUtils.translateInternal(t, te, text, named);
  };

  public static translateGlobal = (text, named: NamedValue | null = null) => {
    const { t, te } = i18n.global;
    return I18nUtils.translateInternal(t, te, text, named);
  };

  private static translateInternal = (
    t,
    te,
    text,
    named: NamedValue | null = null
  ) => {
    if (text) {
      if (te(text)) {
        return t(text, named);
      } else {
        return text;
      }
    }

    return "";
  };

  public static getLanguageName = (code) => {
    if (code == "en") {
      return "English";
    } else if (code == "zh-CN") {
      return "简体中文";
    }
  };
}
