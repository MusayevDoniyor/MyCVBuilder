import { useFormData } from "../../hooks/useFormData";
import { FileText } from "lucide-react";

export const AboutMeSection = () => {
  const { data, updateAboutMe } = useFormData();

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          O'zim haqida
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Qisqacha ma'lumot *
        </label>
        <textarea
          value={data.aboutMe}
          onChange={(e) => updateAboutMe(e.target.value)}
          placeholder="O'zingiz haqida qisqacha ma'lumot bering. Masalan: Tajribali Fullstack Developer bo'lib, React, Node.js va PostgreSQL bilan ishlayman..."
          className="form-textarea w-full text-sm h-32 resize-none"
          maxLength={700}
          required
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Bu ma'lumot CV'ingizning yuqori qismida ko'rsatiladi
          </p>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {data.aboutMe.length}/700
          </span>
        </div>
      </div>
    </div>
  );
};
