import React, { useState } from "react";
import { Input, Radio } from "antd";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import MDEditor from "@uiw/react-md-editor";
import { TQuestion } from "@/types/question.type";

const QuestionEdit = ({ question }: { question: TQuestion }) => {
  const [value, setValue] = useState<string | undefined>("**Hello world!**");

  return (
    <>
      <div data-color-mode="light">
        <MDEditor
          value={question?.desc}
          onChange={setValue}
          preview="preview"
          height="100%"
          components={{
            toolbar: (command, disabled, executeCommand) => {
              if (command.keyCommand === "code") {
                return (
                  <button
                    aria-label="Insert code"
                    disabled={disabled}
                    onClick={(evn) => {
                      evn.stopPropagation();
                      executeCommand(command, command.groupName);
                    }}
                  >
                    Code
                  </button>
                );
              }
            },
          }}
        />
        <MDEditor.Markdown source={question?.desc} />
        {/* <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown> */}
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
