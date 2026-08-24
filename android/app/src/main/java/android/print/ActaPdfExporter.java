package android.print;

import android.content.Context;
import android.os.CancellationSignal;
import android.os.Handler;
import android.os.Looper;
import android.os.ParcelFileDescriptor;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.File;

/**
 * HTML → PDF via WebView print adapter. Lives in android.print so package-private
 * PrintDocumentAdapter callbacks can be subclassed.
 */
public final class ActaPdfExporter {
    public interface Callback {
        void onComplete(boolean success);
    }

    private ActaPdfExporter() {
    }

    public static void htmlToPdf(Context context, String html, File outputFile, Callback callback) {
        new Handler(Looper.getMainLooper()).post(() -> {
            WebView webView = new WebView(context.getApplicationContext());
            webView.getSettings().setDefaultTextEncodingName("utf-8");
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageFinished(WebView view, String url) {
                    PrintDocumentAdapter adapter = webView.createPrintDocumentAdapter("acta");
                    PrintAttributes attributes = new PrintAttributes.Builder()
                            .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                            .setResolution(new PrintAttributes.Resolution("pdf", "pdf", 600, 600))
                            .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                            .build();

                    adapter.onLayout(
                            null,
                            attributes,
                            null,
                            new PrintDocumentAdapter.LayoutResultCallback() {
                                @Override
                                public void onLayoutFinished(PrintDocumentInfo info, boolean changed) {
                                    try {
                                        File parent = outputFile.getParentFile();
                                        if (parent != null) {
                                            parent.mkdirs();
                                        }
                                        ParcelFileDescriptor pfd = ParcelFileDescriptor.open(
                                                outputFile,
                                                ParcelFileDescriptor.MODE_CREATE
                                                        | ParcelFileDescriptor.MODE_WRITE_ONLY
                                                        | ParcelFileDescriptor.MODE_TRUNCATE
                                        );
                                        adapter.onWrite(
                                                new PageRange[]{PageRange.ALL_PAGES},
                                                pfd,
                                                new CancellationSignal(),
                                                new PrintDocumentAdapter.WriteResultCallback() {
                                                    @Override
                                                    public void onWriteFinished(PageRange[] pages) {
                                                        try {
                                                            pfd.close();
                                                        } catch (Exception ignored) {
                                                        }
                                                        webView.destroy();
                                                        callback.onComplete(outputFile.length() > 0);
                                                    }

                                                    @Override
                                                    public void onWriteFailed(CharSequence error) {
                                                        try {
                                                            pfd.close();
                                                        } catch (Exception ignored) {
                                                        }
                                                        webView.destroy();
                                                        callback.onComplete(false);
                                                    }
                                                }
                                        );
                                    } catch (Exception e) {
                                        webView.destroy();
                                        callback.onComplete(false);
                                    }
                                }

                                @Override
                                public void onLayoutFailed(CharSequence error) {
                                    webView.destroy();
                                    callback.onComplete(false);
                                }
                            },
                            null
                    );
                }
            });
            webView.loadDataWithBaseURL(null, html, "text/html; charset=UTF-8", "UTF-8", null);
        });
    }
}
