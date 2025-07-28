import { useFormData } from "../../hooks/useFormData";
import { User, MapPin, Phone, Mail, Camera } from "lucide-react";

export const PersonalInfoSection = () => {
  const { data, updatePersonalInfo } = useFormData();

  const handleInputChange = (
    field: keyof typeof data.personalInfo,
    value: string
  ) => {
    updatePersonalInfo({ [field]: value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatePersonalInfo({ profilePhoto: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Shaxsiy Ma'lumotlar
        </h3>
      </div>

      <div className="space-y-4">
        {/* Profile Photo */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="relative mb-2 sm:mb-0">
            {data.personalInfo.profilePhoto ? (
              <img
                src={data.personalInfo.profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
                <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-primary-600 dark:bg-primary-500 text-white p-1 rounded-full cursor-pointer hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
              <Camera className="w-3 h-3" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1 w-full">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Profil rasmi
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              JPG, PNG yoki GIF (max 2MB)
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            To'liq ism *
          </label>
          <input
            type="text"
            value={data.personalInfo.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Masalan: Doniyor Karimov"
            className="form-input w-full text-sm"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lavozim *
          </label>
          <input
            type="text"
            value={data.personalInfo.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Masalan: Fullstack Developer"
            className="form-input w-full text-sm"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Manzil *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={data.personalInfo.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Masalan: Tashkent, Uzbekistan"
              className="form-input pl-10 w-full text-sm"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Telefon raqam *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="tel"
              value={data.personalInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+998 90 123 45 67"
              className="form-input pl-10 w-full text-sm"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email manzil *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="doniyor@example.com"
              className="form-input pl-10 w-full text-sm"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
