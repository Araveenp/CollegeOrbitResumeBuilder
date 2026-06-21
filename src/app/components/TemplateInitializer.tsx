"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeSettings } from "lib/redux/settingsSlice";

export const TemplateInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const template = urlParams.get("template");
      if (template && ["standard", "classic", "deedy"].includes(template)) {
        dispatch(changeSettings({ field: "template", value: template }));
      }
    }
  }, [dispatch]);

  return null;
};
