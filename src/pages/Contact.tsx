
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Contact Us
        </h1>
        <div className="bg-

If there's knowledge, context or custom instructions you want to include in every edit in this project, set it below.

<lov-actions>
<lov-knowledge>
</lov-actions>

If your project requires backend functionality, such as user authentication, image storage, and blog post management, you can use the Supabase menu on the top right to connect your project to Supabase.
<lov-actions>
<lov-message-prompt message="Tell me more about Supabase">Learn more about Supabase</lov-message-prompt>
</lov-actions>
