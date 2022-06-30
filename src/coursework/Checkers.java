package coursework;

public class Checkers {
    /**
     * Проверка большая ли первая буква
     * @param str
     * @return большая ли первая буква
     */
    public static boolean isFirstLetterCapital(String str) {
        if (str.length() < 1)
            return false;
        if (Character.isUpperCase(str.charAt(0)))
            return true;
        return false;
    }

    /**
     * Убрать пробелы с начала, конца и середины
     * @param str
     * @return очищенная строка
     */
    public static String removeExtraSpaces(String str){
        return str.trim().replaceAll(" +", " ");
    }
}
