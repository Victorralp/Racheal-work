import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isEditableElement = (element: EventTarget | null) => {
  if (!(element instanceof HTMLElement)) return false;
  const tagName = element.tagName.toLowerCase();
  const editableTags = ["input", "textarea", "select"];
  if (editableTags.includes(tagName)) return true;
  if (element.isContentEditable) return true;
  return false;
};

export const AdminShortcutListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (!event.shiftKey || !event.ctrlKey) return;
      if (event.key.toLowerCase() !== "a") return;
      if (isEditableElement(event.target)) return;

      event.preventDefault();
      navigate("/admin/login");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
};

export default AdminShortcutListener;

