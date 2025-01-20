import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { TQuestion } from "@/types/question.type";
import { useUpdateQuestionMutation } from "@/redux/features/question/questionApi";
import { diffWords } from "diff";

const QuestionEdit = ({ question }: { question: TQuestion }) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [updateDesc, setUpdateDesc] = useState<string | undefined>(
    question?.newDesc || question?.desc || ""
  );

  const [updateQuestionDetails] = useUpdateQuestionMutation();

  //   console.log(updateDesc);
  //   console.log(question?.newDesc);
  //   console.log(question?.desc);

  const handleNewDetailsUpdate = async (value: string) => {
    // const toastId = toast.loading("Updating doctor info...");
    setUpdateDesc(value);

    const newUpdateDesc: any = {
      newDesc: updateDesc,
    };

    const updateInfo = {
      id: question?._id,
      data: newUpdateDesc,
    };

    try {
      const res = await updateQuestionDetails(updateInfo).unwrap();
      //   console.log(res);
      //   if (res?.success) {
      //     toast.success("Successfully updated the doctor", { id: toastId });
      //   } else {
      //     toast.error("Something want wrong!", { id: toastId });
      //   }
    } catch (error: any) {
      console.log(error);
    }
  };

  const [originalDesc] = useState<string>(question?.desc || "");

  //   const handleSave = () => {
  //     // Mock save logic
  //     console.log("Saving data:", updateDesc);
  //     // Compare original and updated descriptions for differences
  //     const changes = diff.diffWords(originalDesc, updateDesc);
  //     console.log("Changes:", changes);
  //     setEnableEdit(false);
  //   };

  //   const renderHighlightedText = () => {
  //     const changes = diff.diffWords(originalDesc, updateDesc);
  //     return changes.map((part, index) => {
  //       const style = part.added
  //         ? "bg-green-200"
  //         : part.removed
  //         ? "bg-red-200 line-through"
  //         : "";
  //       return (
  //         <span key={index} className={`${style} px-1`}>
  //           {part.value}
  //         </span>
  //       );
  //     });
  //   };

  const getHighlightedDiff = (oldText: string, newText: string) => {
    const diff = diffWords(oldText, newText);

    return diff.map((part, index) => {
      const color = part.added
        ? "bg-green-200"
        : part.removed
        ? "bg-red-200"
        : "";
      return (
        <span key={index} className={`${color} px-1`}>
          {part.value}
        </span>
      );
    });
  };

  const getMarkdownDiff = (oldText: string, newText: string) => {
    const diff = diffWords(oldText, newText);

    return diff
      .map((part, index) => {
        if (part.added) {
          // Added text with green background in markdown
          return `<span className="text-[#008000] bg-[#e6ffe6] px-1">${part.value}</span>`;
        }
        if (part.removed) {
          // Removed text with red background in markdown
          return `<span className="text-[#ff0000] bg-[#ffe6e6] px-1">${part.value}</span>`;
        }
        // Unchanged text, just return it
        return part.value;
      })
      .join(""); // Join the array into a single string
  };

  useEffect(() => {
    if (question?.newDesc) {
      setUpdateDesc(question?.newDesc);
    } else {
      setUpdateDesc(question?.desc);
    }
  }, [question]);

  return (
    <>
      <div data-color-mode="light">
        {enableEdit ? (
          <MDEditor
            value={updateDesc}
            onChange={(value: any) => handleNewDetailsUpdate(value)}
            preview="edit"
            height="100%"
          />
        ) : (
          <div className="prose">
            <div>
              <MDEditor.Markdown
                source={getMarkdownDiff(question?.desc || "", updateDesc || "")}
              />
              {/* {getHighlightedDiff(question?.desc || " ", updateDesc || " ")} */}
            </div>
          </div>
        )}
        {/* {enableEdit ? (
          <MDEditor
            value={updateDesc}
            onChange={(value: any) => handleNewDetailsUpdate(value)}
            preview="edit"
            height="100%"
            // components={{
            //   toolbar: (command, disabled, executeCommand) => {
            //     if (command.keyCommand === "code") {
            //       return (
            //         <button
            //           aria-label="Insert code"
            //           disabled={disabled}
            //           onClick={(evn) => {
            //             evn.stopPropagation();
            //             executeCommand(command, command.groupName);
            //           }}
            //         >
            //           Code
            //         </button>
            //       );
            //     }
            //   },
            // }}
          />
        ) : (
          <MDEditor.Markdown source={updateDesc} />
        )} */}
        <div className="mt-8">
          <button
            className="cursor-pointer text-base font-medium block ml-auto bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary/60 px-5 py-2 rounded-xl transition duration-150"
            type="submit"
            onClick={() => setEnableEdit(!enableEdit)}
          >
            {enableEdit ? "Back to normal mode" : "Open Editable Mode"}
          </button>
        </div>
      </div>
      {/* <div>
        <p className="text-base font-medium mb-1">Choose the right answer</p>
        <Radio.Group className="*:!text-xl">
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
          <Radio value="c">C</Radio>
          <Radio value="d">D</Radio>
        </Radio.Group>
        <h4 className="mt-2 text-xl font-semibold">
          Correct Answer: <span>A</span>
        </h4>
      </div>
      <div className="mt-7 flex flex-col gap-3">
        <div>
          <p className="text-base font-medium mb-1">
            Why <span>A</span> is correct?
          </p>
          <Input.TextArea rows={4} />
        </div>
        <div>
          <p className="text-base font-medium mb-1">
            Why <span>B</span> is wrong?
          </p>
          <Input.TextArea rows={4} />
        </div>
        <div>
          <p className="text-base font-medium mb-1">
            Why <span>C</span> is wrong
          </p>
          <Input.TextArea rows={4} />
        </div>
        <div>
          <p className="text-base font-medium mb-1">
            Why <span>D</span> is wrong
          </p>
          <Input.TextArea rows={4} />
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-3">
        <div>
          <p className="text-lg font-semibold mb-1">Common Pitfalls:</p>
          <Input.TextArea rows={4} />
        </div>
        <div>
          <p className="text-lg font-semibold mb-1">Strategy Section:</p>
          <Input.TextArea rows={4} />
        </div>
      </div> */}
    </>
  );
};

export default QuestionEdit;
